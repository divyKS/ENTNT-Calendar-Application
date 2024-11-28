import React from 'react';
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    let navigate = useNavigate();

    if (!token) {
        return  navigate("/login");
    }

    if (role && role !== userRole) {
        return  navigate("/");
    }

    return children;
};

export default ProtectedRoute;
