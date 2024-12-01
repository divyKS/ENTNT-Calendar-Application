import React from "react";
import { useNavigate } from "react-router";
import { logout } from "../api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("role");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-medium py-2 px-6 rounded-md hover:bg-red-600 transition duration-200 shadow-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
