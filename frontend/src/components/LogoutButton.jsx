import React from 'react';
import { useNavigate } from 'react-router';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        // Optionally call a backend logout endpoint
        fetch('http://localhost:3500/api/user/logout', { method: 'POST' })
            .then(() => {
                navigate('/login');
            })
            .catch((err) => console.error('Logout error:', err));
    };

    return (
        <button onClick={handleLogout} style={{ margin: '20px', padding: '10px' }}>
            Logout
        </button>
    );
};

export default LogoutButton;
