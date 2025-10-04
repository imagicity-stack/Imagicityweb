import { useEffect, useMemo, useState } from 'react';
import './TextRotator.css';

const TextRotator = ({ phrases = [], interval = 2200 }) => {
  const items = useMemo(() => (phrases.length ? phrases : ['Strategizing', 'Branding', 'Designing', 'Creating']), [phrases]);
  const [active, setActive] = useState({ index: 0, prev: null });

  useEffect(() => {
    setActive({ index: 0, prev: null });
  }, [items]);

  useEffect(() => {
    if (items.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActive(state => {
        const nextIndex = (state.index + 1) % items.length;
        return { index: nextIndex, prev: state.index };
      });
    }, interval);
    return () => clearInterval(timer);
  }, [items, interval]);

  useEffect(() => {
    if (active.prev === null) return undefined;
    const timeout = setTimeout(() => {
      setActive(state => ({ ...state, prev: null }));
    }, 620);
    return () => clearTimeout(timeout);
  }, [active.index, active.prev]);

  return (
    <span className="text-rotator" aria-live="polite">
      {items.map((text, idx) => {
        const isActive = idx === active.index;
        const isExiting = idx === active.prev;

        return (
          <span
            key={text + idx}
            className={`text-rotator__item${isActive ? ' is-active' : ''}${isExiting ? ' is-exit' : ''}`}
            aria-hidden={!isActive}
          >
            {text}
          </span>
        );
      })}
    </span>
  );
};

export default TextRotator;
