import axios from 'axios';
const BASE_URL = 'http://localhost:3500/api'; // Your backend URL

export const signup = async (data) => {
    const response = await fetch(`${BASE_URL}/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const login = async (data) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};


export const fetchCompanies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/companies`); // Ensure backend is proxied or API endpoint is correct
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw error;
    }
};