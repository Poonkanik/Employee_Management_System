import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("auth") === "true";

  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
