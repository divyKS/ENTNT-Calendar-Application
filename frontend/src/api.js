import axios from "axios";
const BASE_URL = "http://localhost:3500/api"; // Your backend URL

export const signup = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const login = async (data) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/companies`); // Ensure backend is proxied or API endpoint is correct
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const updateCompany = async (id, updates) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/companies/${id}`,
      updates,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/admin/companies/${id}`);
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};
