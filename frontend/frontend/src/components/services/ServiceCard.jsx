export default function ServiceCard({ service }) {
  return (
    <div className="package-card">
      <div className="package-card-header">
        <div className="package-card-icon">🚗</div>
      </div>

      <div className="package-card-body">
        <div className="package-name">{service.name}</div>
        <div className="package-category">{service.category}</div>

        <ul className="package-features">
          {service.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      <div className="package-footer">
        <div>
          <div className="package-price">₹{service.price}</div>
          <div className="package-price-note">Starting price</div>
        </div>

        <button className="btn btn-primary btn-sm">
          Book
        </button>
      </div>
    </div>
  );
}