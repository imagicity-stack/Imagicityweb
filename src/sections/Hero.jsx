import TextRotator from '../components/TextRotator.jsx';
import logo from '../assets/imagicity-logo.svg';

const Hero = () => {
  return (
    <section id="home" className="section hero">
      <div className="hero__grid">
        <div className="hero__intro">
          <img src={logo} alt="Imagicity logo" className="hero__logo" />
          <div className="hero__headline">
            <span className="hero__tag">We help brands in</span>
            <TextRotator phrases={['Strategizing', 'Branding', 'Designing', 'Creating']} />
          </div>
          <p className="hero__description">
            Imagicity is a future-forward creative agency crafting immersive brand universes, blurring the line between
            imagination and interaction. We choreograph strategy, design, and technology into experiences people feel.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#services">
              Start a project
            </a>
            <a className="button button--ghost" href="#works">
              View showreel
            </a>
          </div>
        </div>
        <div className="hero__meta">
          <div className="hero__card">
            <h3>14+</h3>
            <p>immersive brand ecosystems launched globally.</p>
          </div>
          <div className="hero__card">
            <h3>80%</h3>
            <p>average lift in audience engagement across campaigns.</p>
          </div>
          <div className="hero__card hero__card--highlight">
            <h3>Let&apos;s co-create</h3>
            <p>We design adaptive worlds for fearless brands ready to reinvent tomorrow.</p>
          </div>
        </div>
      </div>
      <div className="hero__scroll">
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
