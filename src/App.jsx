import { useMemo } from 'react';
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
        <section id="contact" className="section contact">
          <div className="section__label">Contact</div>
          <div className="contact__grid">
            <div className="contact__intro">
              <strong className="contact__headline">Let&apos;s Connect Today</strong>
              <p>
                Share a few details about your next bold move and we&apos;ll map the path from spark to launch within one
                business day.
              </p>
            </div>
            <form className="contact__form" onSubmit={event => event.preventDefault()} noValidate>
              <label className="contact__field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
              </label>
              <label className="contact__field">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
              <label className="contact__field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(+00) 123 456 789"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </label>
              <label className="contact__field contact__field--message">
                <span>Your Message</span>
                <textarea name="message" placeholder="Tell us about your project" rows="4" required />
              </label>
              <button type="submit" className="button button--primary contact__submit">
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className="page__footer">
        <span>© {new Date().getFullYear()} Imagicity Studio. Crafted with imagination &amp; intention.</span>
      </footer>
    </div>
  );
};

export default App;
