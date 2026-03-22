export default function FeaturedServices() {
  const services = [
    {
      name: "Full Detailing",
      price: "₹1999",
      desc: "Complete interior & exterior detailing."
    },
    {
      name: "Ceramic Coating",
      price: "₹4999",
      desc: "Long-lasting paint protection."
    },
    {
      name: "Interior Deep Clean",
      price: "₹1499",
      desc: "Deep vacuum & sanitization."
    }
  ];

  return (
    <section className="featured-section container">
      <div className="section-label">Top Services</div>
      <h2 className="section-title">Featured Packages</h2>

      <div className="featured-grid">
        {services.map((s, i) => (
          <div key={i} className="featured-card">
            <div className="service-tag">Premium</div>
            <div className="service-name">{s.name}</div>
            <div className="service-price">{s.price}</div>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}