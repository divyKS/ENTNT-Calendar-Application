import React from "react"
import { Route, Routes } from "react-router"
import Signup from "./components/Signup"
import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminPage from "./components/AdminPage"
import UserPage from "./components/UserPage"
import EditCompany from "./components/EditCompany"
import Notifications from "./components/Notifications"
import CalendarView from "./components/CalendarView"
import AdminForm from "./components/AdminForm"
import LandingPage from "./components/LandingPage"

function App() {
  return (
    <Routes>
        <Route index element={<LandingPage />} /> {/* Updated to use LandingPage */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes for Admin */}
        <Route 
            path="/admin" 
            element={
                <ProtectedRoute role="Admin">
                    <AdminPage />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/admin/create-company" 
            element={
                <ProtectedRoute role="Admin">
                    <AdminForm />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/admin/edit-company/:id" 
            element={
                <ProtectedRoute role="Admin">
                    <EditCompany />
                </ProtectedRoute>
            } 
        />

        {/* Protected Routes for User */}
        <Route 
            path="/user" 
            element={
                <ProtectedRoute role="User">
                    <UserPage />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/notifs" 
            element={
                <ProtectedRoute role="User">
                    <Notifications />
                </ProtectedRoute>
            } 
        />
        <Route 
            path="/calendar" 
            element={
                <ProtectedRoute role="User">
                    <CalendarView />
                </ProtectedRoute>
            } 
        />

        <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Routes>
  )
}

export default App
