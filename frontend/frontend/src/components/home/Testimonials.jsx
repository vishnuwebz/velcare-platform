export default function Testimonials() {
  const reviews = [
    {
      name: "Arjun",
      text: "Amazing service! My car looks brand new."
    },
    {
      name: "Rahul",
      text: "Very professional and on-time service."
    },
    {
      name: "Kiran",
      text: "Best detailing experience ever!"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-label">Reviews</div>
        <h2 className="section-title">What Clients Say</h2>

        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">{r.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{r.name[0]}</div>
                <div>
                  <div className="author-name">{r.name}</div>
                  <div className="author-car">Customer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}