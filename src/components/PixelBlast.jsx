import { useMemo } from 'react';
import './PixelBlast.css';

const PixelBlast = ({ shards = 42 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: shards }, (_, index) => ({
        angle: (index / shards) * 360,
        distance: 26 + Math.random() * 48,
        delay: Math.random() * 4,
        duration: 5.5 + Math.random() * 4.5,
        size: 12 + Math.random() * 22,
        hue: (350 + Math.random() * 40) % 360,
      })),
    [shards]
  );

  return (
    <div className="pixel-blast" aria-hidden="true">
      {particles.map((particle, index) => (
        <span
          key={index}
          style={{
            '--angle': `${particle.angle}deg`,
            '--distance': `${particle.distance}vmin`,
            '--delay': `${particle.delay * -1}s`,
            '--duration': `${particle.duration}s`,
            '--size': `${particle.size}px`,
            '--hue': particle.hue,
          }}
        />
      ))}
    </div>
  );
};

export default PixelBlast;
