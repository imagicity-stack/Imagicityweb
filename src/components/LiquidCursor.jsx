import { useEffect, useRef } from 'react';
import './LiquidCursor.css';

const LiquidCursor = () => {
  const blobRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...pointer };
    const haloCurrent = { ...pointer };
    const velocity = { x: 0, y: 0 };

    const handlePointerMove = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const damp = (source, dest, smoothing) => source + (dest - source) * smoothing;

    let animationFrame;
    const render = () => {
      current.x = damp(current.x, pointer.x, 0.2);
      current.y = damp(current.y, pointer.y, 0.2);

      velocity.x = damp(velocity.x, pointer.x - current.x, 0.05);
      velocity.y = damp(velocity.y, pointer.y - current.y, 0.05);

      haloCurrent.x = damp(haloCurrent.x, pointer.x + velocity.x * 3, 0.08);
      haloCurrent.y = damp(haloCurrent.y, pointer.y + velocity.y * 3, 0.08);

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloCurrent.x}px, ${haloCurrent.y}px, 0)`;
        const speed = Math.hypot(velocity.x, velocity.y) / 18;
        const scale = Math.min(1.2 + speed, 1.8);
        haloRef.current.style.setProperty('--scale', scale.toFixed(2));
      }

      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove);
    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="liquid-cursor">
      <div className="liquid-cursor__background" aria-hidden="true" />
      <div className="liquid-cursor__blob" ref={blobRef} aria-hidden="true" />
      <div className="liquid-cursor__halo" ref={haloRef} aria-hidden="true" />
    </div>
  );
};

export default LiquidCursor;
