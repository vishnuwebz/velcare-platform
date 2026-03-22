export default function ServiceCard({ service }) {
  return (
    <div className="package-card">
      <div className="package-card-header">
        <div className="package-card-icon">🚗</div>
      </div>

      <div className="package-card-body">
        <div className="package-name">{service.name}</div>
        <div className="package-category">
          {service.category.name}
        </div>

        <div className="package-features">
          {service.description}
        </div>
      </div>

      <div className="package-footer">
        <div>
          <div className="package-price">
            ₹{service.base_price}
          </div>
          <div className="package-price-note">
            Duration: {service.duration_minutes} mins
          </div>
        </div>

        <button className="btn btn-primary btn-sm">
          Book
        </button>
      </div>
    </div>
  );
}