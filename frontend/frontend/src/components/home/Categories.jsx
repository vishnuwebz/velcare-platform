export default function Categories() {
  const categories = [
    { icon: "🚗", title: "Exterior Wash", count: "12 Services" },
    { icon: "🧽", title: "Interior Cleaning", count: "8 Services" },
    { icon: "✨", title: "Detailing", count: "15 Services" },
    { icon: "🛡️", title: "Protection", count: "6 Services" },
  ];

  return (
    <section className="categories-section container">
      <div className="section-label">Services</div>
      <h2 className="section-title">Our Categories</h2>

      <div className="cat-grid">
        {categories.map((cat, index) => (
          <div key={index} className="cat-card">
            <span className="cat-card-icon">{cat.icon}</span>
            <h3 className="cat-card-title">{cat.title}</h3>
            <p className="cat-card-count">{cat.count}</p>
            <div className="cat-card-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}