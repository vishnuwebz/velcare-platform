import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // 🔥 Check token
  const token = localStorage.getItem("token");

  // ❌ Not logged in → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
}