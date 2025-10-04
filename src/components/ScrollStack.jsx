import './ScrollStack.css';

const ScrollStack = ({ items }) => {
  return (
    <div className="scroll-stack" role="list">
      {items.map((item, index) => (
        <article
          key={item.title}
          className="scroll-stack__item"
          role="listitem"
          style={{ '--stack-index': index }}
        >
          <div className="scroll-stack__glow" aria-hidden="true" />
          <header className="scroll-stack__header">
            <span className="scroll-stack__index">{String(index + 1).padStart(2, '0')}</span>
            <div className="scroll-stack__titles">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </header>
          <p className="scroll-stack__description">{item.description}</p>
          <ul className="scroll-stack__highlights">
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default ScrollStack;
