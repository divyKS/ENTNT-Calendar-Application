import React from 'react';
import { useNavigate } from 'react-router';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        // Optionally call a backend logout endpoint
        fetch('http://localhost:3500/api/auth/logout', { method: 'POST' })
            .then(() => {
                navigate('/login');
            })
            .catch((err) => console.error('Logout error:', err));
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
