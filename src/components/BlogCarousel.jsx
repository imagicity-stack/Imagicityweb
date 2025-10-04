import { useRef, useState } from 'react';
import './BlogCarousel.css';

const BlogCarousel = ({ items }) => {
  const viewportRef = useRef(null);
  const pointerStateRef = useRef({ x: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scrollBy = (direction) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const offset = viewport.clientWidth * 0.85 * direction;
    viewport.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const handlePointerDown = (event) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
    pointerStateRef.current = { x: event.clientX, scrollLeft: viewport.scrollLeft };
    viewport.classList.add('is-grabbing');
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const delta = event.clientX - pointerStateRef.current.x;
    viewport.scrollLeft = pointerStateRef.current.scrollLeft - delta;
  };

  const endDrag = (event) => {
    if (!isDragging) return;
    const viewport = viewportRef.current;
    if (viewport) {
      if (viewport.hasPointerCapture?.(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      viewport.classList.remove('is-grabbing');
    }
    setIsDragging(false);
  };

  return (
    <div className="blog-carousel">
      <button type="button" className="blog-carousel__control" onClick={() => scrollBy(-1)} aria-label="Scroll previous">
        ‹
      </button>
      <div
        className="blog-carousel__viewport"
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="blog-carousel__track" role="list">
          {items.map((item) => (
            <article key={item.title} className="blog-card" role="listitem">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a className="blog-card__link" href="#">
                {item.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
      <button type="button" className="blog-carousel__control" onClick={() => scrollBy(1)} aria-label="Scroll next">
        ›
      </button>
    </div>
  );
};

export default BlogCarousel;
