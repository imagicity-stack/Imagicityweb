import { useMemo } from 'react';
import GradualBlur from './components/GradualBlur.jsx';
import GooeyNav from './components/GooeyNav.jsx';
import LiquidCursor from './components/LiquidCursor.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Services from './sections/Services.jsx';

const App = () => {
  const menuItems = useMemo(
    () => [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Works', href: '#works' },
      { label: 'Blogs', href: '#blogs' },
      { label: 'Contact Us', href: '#contact' }
    ],
    []
  );

  return (
    <div className="page">
      <LiquidCursor />
      <GradualBlur
        target="page"
        position="top"
        height="14rem"
        strength={3.8}
        divCount={7}
        opacity={0.95}
        curve="bezier"
      />
      <GradualBlur
        target="page"
        position="bottom"
        height="18rem"
        strength={4.2}
        divCount={7}
        opacity={0.95}
        curve="bezier"
      />
      <header className="page__header">
        <GooeyNav items={menuItems} colors={[1, 2, 3, 4, 5, 6]} />
      </header>
      <main className="page__content">
        <Hero />
        <About />
        <Services />
        <section id="works" className="section placeholder">
          <div className="section__label">Works</div>
          <p>Case studies portal arriving soon — curated narratives of immersive launches, installations, and films.</p>
        </section>
        <section id="blogs" className="section placeholder">
          <div className="section__label">Blogs</div>
          <p>Insights, trend reports, and process logs from the Imagicity studio.</p>
        </section>
        <section id="contact" className="section placeholder">
          <div className="section__label">Contact</div>
          <p>
            Ready to make something magnetic? <a href="mailto:hello@imagicity.co">hello@imagicity.co</a>
          </p>
        </section>
      </main>
      <footer className="page__footer">
        <span>© {new Date().getFullYear()} Imagicity Studio. Crafted with imagination &amp; intention.</span>
      </footer>
    </div>
  );
};

export default App;
