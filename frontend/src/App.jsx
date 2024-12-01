import React from "react";
import { Route, Routes } from "react-router";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./components/admin/AdminPage";
import UserPage from "./components/user/UserPage";
import EditCompany from "./components/admin/EditCompany";
import Notifications from "./components/user/Notifications";
import CalendarView from "./components/user/CalendarView";
import AdminForm from "./components/admin/AdminForm";
import LandingPage from "./components/auth/LandingPage";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />{" "}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
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
  );
}

export default App;
