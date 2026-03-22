import { useNavigate } from "react-router-dom";

export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        service: {
          id: service.id,
          name: service.name,
          price: service.base_price,
          duration: service.duration_minutes,
          category: service.category?.name,
        },
      },
    });
  };

  return (
    <div className="package-card">
      {/* HEADER */}
      <div className="package-card-header">
        <div className="package-card-icon">🚗</div>
      </div>

      {/* BODY */}
      <div className="package-card-body">
        <div className="package-name">{service.name}</div>

        <div className="package-category">
          {service.category?.name}
        </div>

        <div className="package-features">
          {service.description || "Professional car care service"}
        </div>
      </div>

      {/* FOOTER */}
      <div className="package-footer">
        <div>
          <div className="package-price">
            ₹{service.base_price}
          </div>

          <div className="package-price-note">
            {service.duration_minutes} mins
          </div>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}