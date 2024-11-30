import React from 'react';
import AdminForm from './AdminForm';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router';

const AdminPage = () => (
    <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center bg-blue-500 text-white px-6 py-4 shadow-md">
            <h2 className="text-xl font-semibold">Welcome to the Admin Page</h2>
            <div className="flex items-center space-x-4">
                <LogoutButton />
            </div>
        </nav>

        {/* Main Content */}
        <div className="p-6">
            <AdminForm />
        </div>
    </div>

);

export default AdminPage;
