import React, { useState } from 'react';
import { signup } from '../api';
import { useNavigate } from 'react-router';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signup(formData);
        if (result.message === 'Signup successful') {
            navigate('/login');
        } else {
            setError(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            {error && (<p style={{ color: 'red' }}>{error}</p>)}
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
