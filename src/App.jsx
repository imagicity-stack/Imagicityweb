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
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
      <main className="page__main" id="home">
        <section className="hero section" aria-labelledby="hero-heading">
          <div className="hero__card">
            <span className="hero__eyebrow">We create</span>
            <h1 className="hero__heading" id="hero-heading">
              <RotatingText words={["brands", "strategies", "websites", "campaigns"]} />
            </h1>
            <p className="hero__meta">
              Creative marketing for teams that want clarity, emotion, and measurable momentum.
            </p>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-heading">
          <div className="section__header">
            <span className="section__eyebrow">About</span>
            <h2 className="section__title" id="about-heading">We choreograph magnetic brand worlds</h2>
          </div>
          <div className="about__content">
            <p>
              We are a creative marketing agency blending strategic intelligence with sensory storytelling.
              From sonic identities to spatial experiences, our team fuses data, design, and daring imagination
              to transform brands into living ecosystems.
            </p>
            <p>
              Every launch is scored like a performance: layered moments, crescendoing emotion, and a final ovation
              measured in growth. We collaborate with founders, futurists, and fearless teams to turn their vision
              into an unforgettable experience.
            </p>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-heading">
          <div className="section__header">
            <span className="section__eyebrow">Services</span>
            <h2 className="section__title" id="services-heading">Momentum engines with a pulse</h2>
            <p className="section__subtitle">
              We build living systems that shimmer, swirl, and surge with your audience.
            </p>
          </div>
          <div className="services__grid" role="list">
            <article className="service-card" role="listitem">
              <div className="service-card__halo" aria-hidden="true" />
              <h3>Brand Biomes</h3>
              <p>
                Multisensory identities grown from cultural research, ritual design, and magnetic storytelling.
              </p>
              <ul>
                <li>Signature worlds &amp; lore</li>
                <li>Visual &amp; verbal harmonics</li>
                <li>Launch cinematics</li>
              </ul>
            </article>
            <article className="service-card" role="listitem">
              <div className="service-card__halo" aria-hidden="true" />
              <h3>Motion Ecosystems</h3>
              <p>
                Responsive experience systems where every swipe, scroll, and shimmer feels orchestrated.
              </p>
              <ul>
                <li>Interactive campaigns</li>
                <li>Spatial web &amp; 3D</li>
                <li>Immersive showrooms</li>
              </ul>
            </article>
            <article className="service-card" role="listitem">
              <div className="service-card__halo" aria-hidden="true" />
              <h3>Signal Amplifiers</h3>
              <p>
                Always-on storytelling engines balancing community sparks with performance data.
              </p>
              <ul>
                <li>Creator constellations</li>
                <li>Editorial &amp; social labs</li>
                <li>Growth intelligence</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section work" id="work" aria-labelledby="work-heading">
          <div className="section__header">
            <span className="section__eyebrow">Selected Work</span>
            <h2 className="section__title" id="work-heading">Signals we set loose</h2>
          </div>
          <div className="work__gallery">
            <article className="work-card">
              <span className="work-card__tag">Experience</span>
              <h3>Nova Biolabs Launch Opera</h3>
              <p>A five-act product reveal blending kinetic light sculptures with a live adaptive soundtrack.</p>
            </article>
            <article className="work-card">
              <span className="work-card__tag">Campaign</span>
              <h3>Orbit Wearable Atlas</h3>
              <p>An interactive atlas letting fans explore co-created product drops across the globe in real time.</p>
            </article>
            <article className="work-card">
              <span className="work-card__tag">Brand</span>
              <h3>Lumen Hotels Resynthesis</h3>
              <p>A regenerative hospitality identity spanning scent, sound, and light-responsive room narratives.</p>
            </article>
          </div>
        </section>

        <section className="section blog" id="blog" aria-labelledby="blog-heading">
          <div className="section__header">
            <span className="section__eyebrow">Insights</span>
            <h2 className="section__title" id="blog-heading">Field notes from the future</h2>
          </div>
          <div className="blog__list" role="list">
            <article className="blog-card" role="listitem">
              <h3>Designing campaigns for synesthetic audiences</h3>
              <p>How multisensory cues help translate complex stories into intuitive experiences.</p>
              <a className="blog-card__link" href="#">Read the essay</a>
            </article>
            <article className="blog-card" role="listitem">
              <h3>Why momentum beats moments</h3>
              <p>A framework for building community engines that sustain energy beyond launch day.</p>
              <a className="blog-card__link" href="#">Dive into the framework</a>
            </article>
            <article className="blog-card" role="listitem">
              <h3>Liquid interfaces for hybrid teams</h3>
              <p>Practical tips for blending physical touchpoints with responsive digital layers.</p>
              <a className="blog-card__link" href="#">Explore the playbook</a>
            </article>
          </div>
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-heading">
          <div className="contact__panel">
            <div className="contact__intro">
              <p className="contact__eyebrow">Partnerships</p>
              <h2 className="contact__title" id="contact-heading">Let&apos;s Connect Today</h2>
              <p>
                Tell us about the future you&apos;re chasing and we&apos;ll shape the momentum plan together.
              </p>
            </div>
            <form className="contact__form" action="#" method="post">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" required />

              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" required aria-required="true" />

              <label htmlFor="contact-phone">Phone Number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                pattern="[0-9+\-()\s]{6,}"
                required
                aria-required="true"
              />

              <label htmlFor="contact-message">Your Message</label>
              <textarea id="contact-message" name="message" rows="4" required aria-required="true" />

              <button type="submit" className="contact__submit">Submit</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
