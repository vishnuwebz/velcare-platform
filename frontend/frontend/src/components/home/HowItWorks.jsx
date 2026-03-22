export default function HowItWorks() {
  const steps = [
    { icon: "📅", title: "Book Service", desc: "Choose your service & schedule." },
    { icon: "🚗", title: "We Arrive", desc: "Expert comes to your location." },
    { icon: "🧼", title: "Service Done", desc: "Professional detailing process." },
    { icon: "✨", title: "Enjoy Ride", desc: "Drive your refreshed car." }
  ];

  return (
    <section className="how-section">
      <div className="container">
        <div className="section-label">Process</div>
        <h2 className="section-title">How It Works</h2>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <div key={i} className="step">
              <div className="step-num">{i + 1}</div>
              <div className="step-icon-wrap">{step.icon}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}