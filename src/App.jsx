import LiquidBackground from './components/LiquidBackground.jsx';
import RotatingText from './components/RotatingText.jsx';

const App = () => {
  return (
    <div className="page">
      <LiquidBackground />
      <header className="page__header">
        <div className="page__header-inner">
          <span className="page__brand">Imagicity</span>
          <nav className="page__nav" aria-label="Primary">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main className="page__main" id="home">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__card">
            <span className="hero__eyebrow">We create</span>
            <h1 className="hero__heading" id="hero-heading">
              <RotatingText words={["brands", "strategies", "websites", "campaigns"]} />
            </h1>
            <p className="hero__meta">Creative marketing for teams that want clarity, emotion, and measurable momentum.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
