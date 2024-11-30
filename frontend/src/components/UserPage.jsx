import React from 'react';
import LogoutButton from './LogoutButton';
import UserDashboard from './UserDashboard';
import LogCommunication from './LogCommunication';
import { Link } from 'react-router';
import NotificationBadge from './NotificationBadge';

const UserPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
  
            <nav className="flex justify-between items-center bg-green-500 text-white px-6 py-4 shadow-md">
                <h2 className="text-xl font-semibold">Welcome to the User Page</h2>
                <div className="flex items-center space-x-4">
                <Link to="/calendar">
                    <button 
                    className="bg-white text-green-500 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200 shadow">
                        Open Calendar
                    </button>
                </Link>
                <NotificationBadge />
                <LogoutButton />
                </div>
            </nav>

            <div className="p-6">
                <UserDashboard />
            </div>
        </div>

    )
}

export default UserPage;
