import { useEffect, useRef } from 'react';
import './LiquidBackground.css';

const LiquidBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const pointer = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };
    let frameId = 0;

    const updateTarget = event => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    };

    const animate = () => {
      current.x += (pointer.x - current.x) * 0.08;
      current.y += (pointer.y - current.y) * 0.08;

      node.style.setProperty('--pointer-x', `${current.x * 100}%`);
      node.style.setProperty('--pointer-y', `${current.y * 100}%`);

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    window.addEventListener('pointermove', updateTarget);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', updateTarget);
    };
  }, []);

  return (
    <div className="liquid-ether" aria-hidden="true" ref={containerRef}>
      <div className="liquid-ether__layer liquid-ether__layer--a" />
      <div className="liquid-ether__layer liquid-ether__layer--b" />
      <div className="liquid-ether__layer liquid-ether__layer--c" />
    </div>
  );
};

export default LiquidBackground;
