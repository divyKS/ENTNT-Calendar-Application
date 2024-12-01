import axios from "axios";

const BASE_URL = "http://localhost:3500/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication APIs
export const signup = async (data) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};

export const login = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// Admin APIs
export const fetchCompanies = async () => {
  try {
    const response = await apiClient.get("/admin/companies");
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const updateCompany = async (id, updates) => {
  try {
    const response = await apiClient.put(`/admin/companies/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    await apiClient.delete(`/admin/companies/${id}`);
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

// Calendar APIs
export const getCalendarCommunications = async () => {
  try {
    const response = await apiClient.get("/calendar/getCommunications");
    return response.data;
  } catch (error) {
    console.error("Error fetching calendar communications:", error);
    throw error;
  }
};

// Notifications APIs
export const fetchAllNotifications = async () => {
  try {
    const response = await apiClient.get("/notifications/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// User Dashboard APIs
export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get("/user/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

// Communication APIs
export const logCommunication = async (companyId, notes) => {
  try {
    await apiClient.post(`/user/log-communication/${companyId}`, { notes });
  } catch (error) {
    console.error("Error logging communication:", error);
    throw error;
  }
};
