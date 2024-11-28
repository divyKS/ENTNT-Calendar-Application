import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router';

const Login = () => {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('role', result.role);
            navigate(result.role === 'Admin' ? '/admin' : '/user');
        } else {
            setError(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
