import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <div className="nav-logo-icon">V</div>
        VELO<span>CARE</span>
      </div>

      <div className="nav-links">
        <button className="nav-link" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="nav-link" onClick={() => navigate("/services")}>
          Services
        </button>
        <button className="nav-link" onClick={() => navigate("/booking")}>
          Booking
        </button>
      </div>

      <div className="nav-actions">
        <button
          className="btn-nav-login"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="btn-nav-cta"
          onClick={() => navigate("/booking")}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}