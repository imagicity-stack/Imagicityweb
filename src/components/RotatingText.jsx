import { useEffect, useMemo, useState } from 'react';
import './RotatingText.css';

const RotatingText = ({ words, interval = 2200 }) => {
  const phrases = useMemo(() => (words && words.length ? words : ['brands', 'strategies', 'websites', 'campaigns']), [words]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [phrases]);

  useEffect(() => {
    if (phrases.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span className="rotating-text" aria-live="polite">
      {phrases.map((word, wordIndex) => {
        const isActive = wordIndex === index;
        return (
          <span
            key={word + wordIndex}
            className={`rotating-text__item${isActive ? ' is-active' : ''}`}
            aria-hidden={!isActive}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default RotatingText;
