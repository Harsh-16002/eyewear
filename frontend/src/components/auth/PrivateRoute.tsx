import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: "user" | "admin"; // optional, if you want to protect by role
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // optional, from login

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if provided)
  if (role && userRole !== role) {
    return <Navigate to="/" replace />; // redirect normal user
  }

  return <>{children}</>; // user is authorized
};

export default PrivateRoute;
