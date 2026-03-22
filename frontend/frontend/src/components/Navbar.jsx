import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // 🔥 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container nav">

        {/* LOGO */}
        <Link to="/" className="logo">
          VELO<span>CARE</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>

          {user && <Link to="/booking">Booking</Link>}
        </nav>

        {/* AUTH BUTTONS */}
        <div className="nav-actions">

          {!user ? (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>

              <Link to="/signup" className="btn btn-primary">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="nav-user">
                Hi, {user.username}
              </span>

              <button
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}