import './MasonryGallery.css';

const MasonryGallery = ({ items }) => {
  return (
    <div className="masonry" role="list">
      {items.map((item) => (
        <article key={item.title} className="work-card masonry__item" role="listitem">
          <span className="work-card__tag">{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
};

export default MasonryGallery;
