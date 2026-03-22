export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-stripe"></div>
      <div className="hero-car-silhouette"></div>

      <div className="container hero-content">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line"></div>
          <span className="hero-eyebrow-text">Premium Car Care</span>
        </div>

        <h1 className="hero-headline">
          DRIVE <span className="accent">PERFECTION</span>
          <br />
          WITH <span className="outline">VELOCARE</span>
        </h1>

        <p className="hero-sub">
          Elite detailing, maintenance & protection services delivered
          at your doorstep by certified professionals.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary">Book Service</button>
          <button className="btn btn-secondary">View Packages</button>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">10K+</div>
            <div className="hero-stat-label">Cars Serviced</div>
          </div>

          <div>
            <div className="hero-stat-num">4.9★</div>
            <div className="hero-stat-label">Customer Rating</div>
          </div>

          <div>
            <div className="hero-stat-num">24/7</div>
            <div className="hero-stat-label">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}