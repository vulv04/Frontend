import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user") ?? "null");
  } catch {
    user = null;
  }

  if (!user) {
    // Chưa đăng nhập
    return <Navigate to="/api/auth/login" replace />;
  }

  // Kiểm tra role hoặc id tùy bạn
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Được phép vào
  return <Outlet />;
};

export default ProtectedRoute;
