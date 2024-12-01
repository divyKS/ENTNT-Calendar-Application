import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");

  if (!role) {
    return <Navigate to={"/login"} />;
  }

  if (role && role !== userRole) {
    return <Navigate to={`/${userRole?.toLowerCase()}`} />;
  }

  return children;
};

export default ProtectedRoute;
