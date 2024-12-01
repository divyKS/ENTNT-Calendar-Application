import React, { useEffect, useState } from "react";
import LogoutButton from "../LogoutButton";
import UserDashboard from "./UserDashboard";
import { Link } from "react-router";
import NotificationBadge from "./NotificationBadge";
import { fetchAllNotifications } from "../../api";

const UserPage = () => {
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    const fetchBadgeCount = async () => {
      try {
        const notifData = await fetchAllNotifications();
        const total = notifData.overdue.length + notifData.today.length;
        setBadgeCount(total);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };
    fetchBadgeCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center bg-blue-500 text-white px-6 py-4 shadow-md">
        <h2 className="text-xl font-semibold">Welcome to the User Page</h2>
        <div className="flex items-center space-x-4">
          <NotificationBadge badgeCount={badgeCount} />
          <Link to="/calendar">
            <button className="bg-white text-blue-500 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200 shadow">
              Calendar
            </button>
          </Link>
          <LogoutButton />
        </div>
      </nav>

      <div className="p-6">
        <UserDashboard setBadgeCount={setBadgeCount} />
      </div>
    </div>
  );
};

export default UserPage;
