import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Handle Signup
  const handleSignup = async () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all required fields ❗");
      return;
    }

    try {
      setLoading(true);

      await API.post("signup/", formData);

      alert("Signup successful 🎉 Please login");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page active">
        <div className="container">

          {/* TITLE */}
          <h1 className="section-title">Create Account</h1>

          <div className="auth-form">

            {/* USERNAME */}
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter username"
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter email"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter password"
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            {/* BUTTON */}
            <button
              className="btn btn-primary"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating..." : "Signup"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}