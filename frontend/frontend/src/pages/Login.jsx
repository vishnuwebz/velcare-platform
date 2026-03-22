import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Handle Login
  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("login/", formData);

      // 🔥 Save token
      localStorage.setItem("token", res.data.access);

      // Optional: store user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful 🎉");

      navigate("/services");

    } catch (error) {
      console.error(error);
      alert("Invalid credentials ❌");
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
          <h1 className="section-title">Login</h1>

          <div className="auth-form">

            {/* USERNAME */}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter username"
              />
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter password"
              />
            </div>

            {/* BUTTON */}
            <button
              className="btn btn-primary"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}