import { useEffect, useMemo, useState } from 'react';
import './TextRotator.css';

const TextRotator = ({ phrases = [], interval = 2200 }) => {
  const items = useMemo(() => (phrases.length ? phrases : ['Strategizing', 'Branding', 'Designing', 'Creating']), [phrases]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex(value => (value + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items, interval]);

  return (
    <div className="text-rotator">
      <div className="text-rotator__mask">
        <div className="text-rotator__rail" style={{ transform: `translateY(-${index * 100}%)` }}>
          {items.map((text, idx) => (
            <span className="text-rotator__item" key={text + idx}>
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextRotator;
