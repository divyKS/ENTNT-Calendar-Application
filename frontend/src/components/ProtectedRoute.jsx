import React from 'react';
import { Navigate, useNavigate } from "react-router";

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    let navigate = useNavigate();

    if (!token) {
        return  <Navigate to={"/login"} />
    }

    if (role && role !== userRole) {
        return <Navigate to={`/${userRole?.toLowerCase()}`} />;
    }

    return children;
};

export default ProtectedRoute;
