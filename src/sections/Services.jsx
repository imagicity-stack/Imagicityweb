import FlowingMenu from '../components/FlowingMenu.jsx';

const serviceItems = [
  {
    link: '#contact',
    text: 'Branding & Identity',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80'
  },
  {
    link: '#contact',
    text: 'G.T.M Strategy',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80'
  },
  {
    link: '#contact',
    text: 'Designing',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    link: '#contact',
    text: 'Web Development',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    link: '#contact',
    text: 'Ecommerce Solution',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80'
  },
  {
    link: '#contact',
    text: 'Content Creation',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
  }
];

const Services = () => {
  return (
    <section id="services" className="section services">
      <div className="section__label">Services</div>
      <div className="services__layout">
        <div className="services__copy">
          <h2>
            Integrated services designed to move audiences from the first spark of <span>awareness</span> to loyal
            advocacy.
          </h2>
          <p>
            Each collaboration is orchestrated around adaptive squads that dissolve silos. Strategy leads the rhythm,
            design shapes the aesthetic, technology fuels interaction, and storytelling keeps the pulse human.
          </p>
          <div className="services__note">
            <strong>Floating service navigator</strong>
            <p>
              Hover any service to reveal its vibe and visual moodboard. We tailor the mix around your launch runway,
              product cadence, and growth ambitions.
            </p>
          </div>
        </div>
        <div className="services__menu" aria-label="Services navigation">
          <FlowingMenu items={serviceItems} />
        </div>
      </div>
    </section>
  );
};

export default Services;
