const About = () => {
  return (
    <section id="about" className="section about">
      <div className="section__label">About Us</div>
      <div className="about__grid">
        <div className="about__story">
          <h2>
            Crafting <span>resonant</span> brand worlds that flow across strategy, story, and screens.
          </h2>
          <p>
            From emergent startups to storied icons, Imagicity partners with teams who believe creativity is a strategic
            superpower. We orchestrate multidisciplinary squads spanning strategy, identity, experience design, 3D motion,
            and engineering to compose narrative-rich ecosystems that move people to act.
          </p>
          <p>
            We design for participation. Our studio experiments with spatial computing, tactile web gestures, and
            adaptive systems so every touchpoint feels alive, responsive, and unmistakably yours.
          </p>
        </div>
        <div className="about__stats">
          <div className="about__stat">
            <span className="about__stat-number">4 studios</span>
            <span className="about__stat-label">London · Dubai · Singapore · Toronto</span>
          </div>
          <div className="about__stat">
            <span className="about__stat-number">40 makers</span>
            <span className="about__stat-label">strategists, artists, coders &amp; storytellers</span>
          </div>
          <div className="about__pillars">
            <h3>Our pillars</h3>
            <ul>
              <li>Radical collaboration</li>
              <li>Designing for emotion</li>
              <li>Technology with soul</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
