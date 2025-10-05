import { useEffect, useRef } from 'react';
import './PixelBlast.css';

const createTouchTexture = () => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context not available');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, size, size);

  const trail = [];
  let last = null;
  const maxAge = 72;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;
  let dirty = true;

  const clear = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
  };

  const drawPoint = (point) => {
    const pos = { x: point.x * size, y: (1 - point.y) * size };
    let intensity = 1;
    const easeOutSine = (t) => Math.sin((t * Math.PI) / 2);
    const easeOutQuad = (t) => -t * (t - 2);

    if (point.age < maxAge * 0.28) intensity = easeOutSine(point.age / (maxAge * 0.28));
    else intensity = easeOutQuad(1 - (point.age - maxAge * 0.28) / (maxAge * 0.72)) || 0;

    intensity *= point.force;

    const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = size * 4;

    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 112, 133, 0.92)';
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const addTouch = (norm) => {
    let force = 0;
    let vx = 0;
    let vy = 0;

    if (last) {
      const dx = norm.x - last.x;
      const dy = norm.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 11000, 1);
    }

    last = { x: norm.x, y: norm.y };
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
    dirty = true;
  };

  const update = () => {
    if (!dirty && trail.length === 0) return false;

    clear();

    for (let i = trail.length - 1; i >= 0; i -= 1) {
      const point = trail[i];
      const f = point.force * speed * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age += 1;
      if (point.age > maxAge) trail.splice(i, 1);
    }

    for (let i = 0; i < trail.length; i += 1) drawPoint(trail[i]);
    dirty = trail.length > 0;
    return true;
  };

  return {
    canvas,
    addTouch,
    update,
    set radiusScale(value) {
      radius = 0.1 * size * value;
      dirty = true;
    },
    get radiusScale() {
      return radius / (0.1 * size);
    },
  };
};

const SHAPE_MAP = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3,
};

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;
uniform int   uShapeType;
uniform int   uLiquidEnabled;
uniform float uLiquidStrength;
uniform float uLiquidFreq;
uniform sampler2D uTouchTexture;

const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  vec2 resolvedCoord = gl_FragCoord.xy;

  if (uLiquidEnabled == 1) {
    vec2 liquidUV = gl_FragCoord.xy / uResolution;
    vec4 tex = texture2D(uTouchTexture, liquidUV);
    float vx = tex.r * 2.0 - 1.0;
    float vy = tex.g * 2.0 - 1.0;
    float intensity = tex.b;
    float wave = 0.5 + 0.5 * sin(uTime * uLiquidFreq + intensity * 6.2831853);
    resolvedCoord += vec2(vx, vy) * intensity * wave * uLiquidStrength * 220.0;
  }

  vec2 fragCoord = resolvedCoord - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / uPixelSize);
  vec2 pixelUV = fract(fragCoord / uPixelSize);

  float cellPixelSize = 8.0 * uPixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * uPixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = resolvedCoord / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;
  gl_FragColor = vec4(color, M);
}
`;

const MAX_CLICKS = 10;

const hexToRgb = (hex) => {
  const value = hex.replace('#', '');
  const normalized = value.length === 3
    ? value.split('').map((ch) => parseInt(ch + ch, 16))
    : [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
  return normalized.map((component) => component / 255);
};

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) || 'Unknown error';
    gl.deleteShader(shader);
    throw new Error(info);
  }
  return shader;
};

const createProgram = (gl, vertexSource, fragmentSource) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program');
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) || 'Unknown program link error';
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(info);
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
};

const PixelBlast = ({
  variant = 'circle',
  pixelSize = 6,
  color = '#ff6f91',
  className,
  style,
  antialias = true,
  patternScale = 3,
  patternDensity = 1.2,
  liquid = true,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  pixelSizeJitter = 0.5,
  enableRipples = true,
  rippleIntensityScale = 1.5,
  rippleThickness = 0.12,
  rippleSpeed = 0.4,
  liquidWobbleSpeed = 5,
  autoPauseOffscreen = true,
  speed = 0.6,
  transparent = true,
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    const gl =
      canvas.getContext('webgl', { alpha: true, antialias }) ||
      canvas.getContext('experimental-webgl', { alpha: true, antialias });

    if (!gl) {
      container.appendChild(canvas);
      canvas.remove();
      return undefined;
    }

    if (transparent) gl.clearColor(0, 0, 0, 0);
    else gl.clearColor(0, 0, 0, 1);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniformLocations = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      color: gl.getUniformLocation(program, 'uColor'),
      pixelSize: gl.getUniformLocation(program, 'uPixelSize'),
      scale: gl.getUniformLocation(program, 'uScale'),
      density: gl.getUniformLocation(program, 'uDensity'),
      pixelJitter: gl.getUniformLocation(program, 'uPixelJitter'),
      enableRipples: gl.getUniformLocation(program, 'uEnableRipples'),
      rippleSpeed: gl.getUniformLocation(program, 'uRippleSpeed'),
      rippleThickness: gl.getUniformLocation(program, 'uRippleThickness'),
      rippleIntensity: gl.getUniformLocation(program, 'uRippleIntensity'),
      edgeFade: gl.getUniformLocation(program, 'uEdgeFade'),
      shapeType: gl.getUniformLocation(program, 'uShapeType'),
      clickPos: gl.getUniformLocation(program, 'uClickPos'),
      clickTimes: gl.getUniformLocation(program, 'uClickTimes'),
      liquidEnabled: gl.getUniformLocation(program, 'uLiquidEnabled'),
      liquidStrength: gl.getUniformLocation(program, 'uLiquidStrength'),
      liquidFreq: gl.getUniformLocation(program, 'uLiquidFreq'),
      touchTexture: gl.getUniformLocation(program, 'uTouchTexture'),
    };

    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uniformLocations.color, r, g, b);
    gl.uniform1f(uniformLocations.scale, patternScale);
    gl.uniform1f(uniformLocations.density, patternDensity);
    gl.uniform1f(uniformLocations.pixelJitter, pixelSizeJitter);
    gl.uniform1i(uniformLocations.enableRipples, enableRipples ? 1 : 0);
    gl.uniform1f(uniformLocations.rippleSpeed, rippleSpeed);
    gl.uniform1f(uniformLocations.rippleThickness, rippleThickness);
    gl.uniform1f(uniformLocations.rippleIntensity, rippleIntensityScale);
    gl.uniform1f(uniformLocations.edgeFade, 0.25);
    gl.uniform1i(uniformLocations.shapeType, SHAPE_MAP[variant] ?? 0);
    gl.uniform1i(uniformLocations.liquidEnabled, liquid ? 1 : 0);
    gl.uniform1f(uniformLocations.liquidStrength, liquidStrength);
    gl.uniform1f(uniformLocations.liquidFreq, liquidWobbleSpeed);

    const clickPositions = new Float32Array(MAX_CLICKS * 2).fill(-1);
    const clickTimes = new Float32Array(MAX_CLICKS).fill(-1000);
    gl.uniform2fv(uniformLocations.clickPos, clickPositions);
    gl.uniform1fv(uniformLocations.clickTimes, clickTimes);

    const touch = liquid || enableRipples ? createTouchTexture() : null;
    let touchTexture = null;
    if (touch) {
      touch.radiusScale = liquidRadius;
      touchTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, touchTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, touch.canvas.width, touch.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, touch.canvas);
      gl.uniform1i(uniformLocations.touchTexture, 0);
    } else {
      const fallbackTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fallbackTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
      gl.uniform1i(uniformLocations.touchTexture, 0);
      touchTexture = fallbackTexture;
    }

    container.appendChild(canvas);

    const resize = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(container.clientWidth * devicePixelRatio));
      const height = Math.max(1, Math.floor(container.clientHeight * devicePixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform2f(uniformLocations.resolution, width, height);
        gl.uniform1f(uniformLocations.pixelSize, pixelSize * devicePixelRatio);
      }
    };

    resize();

    let resizeObserver;
    let resizeListenerAttached = false;
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new window.ResizeObserver(resize);
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', resize);
      resizeListenerAttached = true;
    }

    let clickIndex = 0;
    let currentTime = 0;
    const pointerToPixels = (event) => {
      const rect = canvas.getBoundingClientRect();
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const fx = (event.clientX - rect.left) * devicePixelRatio;
      const fy = (rect.height - (event.clientY - rect.top)) * devicePixelRatio;
      return { fx, fy };
    };

    const handlePointerDown = (event) => {
      if (!enableRipples) return;
      const { fx, fy } = pointerToPixels(event);
      const slot = clickIndex % MAX_CLICKS;
      clickIndex += 1;
      clickPositions[slot * 2] = fx;
      clickPositions[slot * 2 + 1] = fy;
      clickTimes[slot] = currentTime;
      gl.uniform2fv(uniformLocations.clickPos, clickPositions);
      gl.uniform1fv(uniformLocations.clickTimes, clickTimes);
    };

    const handlePointerMove = (event) => {
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      const fx = (event.clientX - rect.left) / rect.width;
      const fy = (event.clientY - rect.top) / rect.height;
      touch.addTouch({ x: fx, y: 1 - fy });
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const startTime = performance.now();

    const render = () => {
      if (!visibleRef.current && autoPauseOffscreen) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      currentTime = ((now - startTime) / 1000) * speed;
      gl.uniform1f(uniformLocations.time, currentTime);

      if (touch) {
        const updated = touch.update();
        if (updated && touchTexture) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, touchTexture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, touch.canvas.width, touch.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, touch.canvas);
        }
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    let observer;
    if (autoPauseOffscreen && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        visibleRef.current = entries.some((entry) => entry.isIntersecting);
      });
      observer.observe(container);
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(rafRef.current);
      resizeObserver?.disconnect();
      if (resizeListenerAttached) window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      gl.deleteBuffer(positionBuffer);
      if (touchTexture) gl.deleteTexture(touchTexture);
      gl.deleteProgram(program);
      container.removeChild(canvas);
    };
  }, [
    antialias,
    autoPauseOffscreen,
    color,
    enableRipples,
    liquid,
    liquidRadius,
    liquidStrength,
    liquidWobbleSpeed,
    patternDensity,
    patternScale,
    pixelSize,
    pixelSizeJitter,
    rippleIntensityScale,
    rippleSpeed,
    rippleThickness,
    speed,
    transparent,
    variant,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pixel-blast-container ${className ?? ''}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
};

export default PixelBlast;
