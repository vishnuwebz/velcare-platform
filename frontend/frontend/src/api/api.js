import axios from "axios";

// ==============================
// BASE CONFIG
// ==============================
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});


// ==============================
// REQUEST INTERCEPTOR
// ==============================
// Attach JWT token automatically (for future auth)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ==============================
// RESPONSE INTERCEPTOR
// ==============================
// Handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);

      // 🔥 Handle unauthorized
      if (error.response.status === 401) {
        alert("Session expired. Please login again.");

        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);


// ==============================
// EXPORT
// ==============================
export default API;