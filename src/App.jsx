import LiquidBackground from './components/LiquidBackground.jsx';
import PixelBlast from './components/PixelBlast.jsx';
import RotatingText from './components/RotatingText.jsx';
import ScrollStack from './components/ScrollStack.jsx';
import MasonryGallery from './components/MasonryGallery.jsx';
import BlogCarousel from './components/BlogCarousel.jsx';

const App = () => {
  const serviceLayers = [
    {
      title: 'Branding & Identity',
      subtitle: 'Signature universes, every pixel intentional',
      description:
        'We architect brand DNA that hums across every sense—from palette and typography to soundscapes and micro-interactions.',
      highlights: ['Naming & verbal worlds', 'Visual languages & design systems', 'Signature motion & sonic motifs'],
    },
    {
      title: 'Graphic Designing',
      subtitle: 'Illustrations that pulse with possibility',
      description:
        'Campaign visuals, decks, and print systems crafted with kinetic layers, light leaks, and texture-rich storytelling.',
      highlights: ['Launch kits & key art', 'Editorial & social systems', 'Experiential signage suites'],
    },
    {
      title: 'G.T.M Strategy',
      subtitle: 'Momentum maps fueled by cultural signals',
      description:
        'We plot the launch choreography—audience sequencing, channel mixing, and revenue ramps—for unstoppable go-to-market moves.',
      highlights: ['Demand design & pipeline choreography', 'Channel & partner orchestration', 'Experiment sprints & analytics'],
    },
    {
      title: 'Campaign Creation',
      subtitle: 'Big arcs told through living micro-moments',
      description:
        'From hype phases to crescendo drops, we script story arcs that feel cinematic, responsive, and always-on.',
      highlights: ['Narrative architecture', 'Influencer & community labs', 'Launch events & experiential beats'],
    },
    {
      title: 'Content Creation',
      subtitle: 'Studios that never sleep',
      description:
        'Short-form, long-form, live or asynchronous—we build modular content engines that shapeshift with your audience.',
      highlights: ['Video & motion editorial', 'Thought leadership suites', 'Social listening & iteration loops'],
    },
    {
      title: 'Digital Marketing',
      subtitle: 'Performance with a pulse',
      description:
        'Full-funnel optimisation across paid, owned, and earned channels—calibrated daily to keep the momentum humming.',
      highlights: ['Paid media ecosystems', 'CRO & experience design', 'Automation & lifecycle flows'],
    },
  ];

  const workProjects = [
    {
      tag: 'Experience',
      title: 'Nova Biolabs Launch Opera',
      description: 'A five-act product reveal blending kinetic light sculptures with a live adaptive soundtrack.',
    },
    {
      tag: 'Campaign',
      title: 'Orbit Wearable Atlas',
      description: 'An interactive atlas letting fans explore co-created product drops across the globe in real time.',
    },
    {
      tag: 'Brand',
      title: 'Lumen Hotels Resynthesis',
      description: 'A regenerative hospitality identity spanning scent, sound, and light-responsive room narratives.',
    },
    {
      tag: 'Product',
      title: 'Pulse OS Future Lab',
      description: 'A modular interface for hybrid teams with adaptive ambient layers and audience-specific dashboards.',
    },
    {
      tag: 'Social',
      title: 'Sora Street Culture Sprint',
      description: 'Twelve-week creator residency translating niche subcultures into shoppable storyworlds.',
    },
    {
      tag: 'Activation',
      title: 'Helio Urban Sound Baths',
      description: 'City-wide multi-sensory pop-ups where commuters shaped the live soundtrack through biometric inputs.',
    },
  ];

  const blogPosts = [
    {
      title: 'Designing campaigns for synesthetic audiences',
      description: 'How multisensory cues help translate complex stories into intuitive experiences.',
      cta: 'Read the essay',
    },
    {
      title: 'Why momentum beats moments',
      description: 'A framework for building community engines that sustain energy beyond launch day.',
      cta: 'Dive into the framework',
    },
    {
      title: 'Liquid interfaces for hybrid teams',
      description: 'Practical tips for blending physical touchpoints with responsive digital layers.',
      cta: 'Explore the playbook',
    },
    {
      title: 'The new rules of brand gravity',
      description: 'Six experiments proving that curiosity-led storytelling keeps audiences orbiting longer.',
      cta: 'See the experiments',
    },
  ];

  return (
    <div className="page">
      <LiquidBackground />
      <PixelBlast />
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
            <span className="section__eyebrow">About Us</span>
            <h2 className="section__title" id="about-heading">Fueling brands that dare to grow.</h2>
            <p className="section__subtitle">Strategy, creativity, and execution that actually move the needle.</p>
          </div>
          <div className="about__content">
            <p>
              We’re not here to play safe—we’re here to make your brand stand out, scale fast, and own its space with sharp
              strategy and unapologetic creativity.
            </p>
          </div>
        </section>

        <section className="section services" id="services" aria-labelledby="services-heading">
          <div className="section__header">
            <span className="section__eyebrow">Services</span>
            <h2 className="section__title" id="services-heading">We Build Brands That Break the Internet.</h2>
            <p className="section__subtitle">Strategy that bites. Creativity that sells.</p>
          </div>
          <p className="services__manifesto">
            We don’t just market—we engineer obsession. From viral campaigns to full-funnel growth systems, we turn clicks
            into cults and brands into legends.
          </p>
          <ScrollStack items={serviceLayers} />
        </section>

        <section className="section work" id="work" aria-labelledby="work-heading">
          <div className="section__header">
            <span className="section__eyebrow">Work</span>
            <h2 className="section__title" id="work-heading">Our Work Speaks Louder Than Buzzwords.</h2>
            <p className="section__subtitle">Real brands. Real growth. Real impact.</p>
          </div>
          <p className="work__intro">
            Every project we touch turns into a case study in bold moves and smart execution. We don’t chase trends—we set
            them, delivering results that make competitors sweat.
          </p>
          <MasonryGallery items={workProjects} />
        </section>

        <section className="section blog" id="blog" aria-labelledby="blog-heading">
          <div className="section__header">
            <span className="section__eyebrow">Blog</span>
            <h2 className="section__title" id="blog-heading">Brain Fuel for the Bold.</h2>
            <p className="section__subtitle">Insights, trends, and hot takes that actually matter.</p>
          </div>
          <BlogCarousel items={blogPosts} />
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-heading">
          <div className="contact__panel">
            <div className="contact__intro">
              <p className="contact__eyebrow">Contact</p>
              <h2 className="contact__title" id="contact-heading">Contact</h2>
              <p className="contact__subtitle">Let&apos;s connect today.</p>
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
      <footer className="page__footer" aria-label="Legal">
        <div className="page__footer-inner">
          <p className="page__footer-copy">Imagicity 2025 all right reserved</p>
          <nav className="page__footer-nav">
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
