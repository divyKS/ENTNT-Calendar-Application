import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaHome } from "react-icons/fa";
import { fetchAllNotifications } from "../../api";

const Notifications = () => {
  const [notifications, setNotifications] = useState({
    overdue: [{}],
    today: [{}],
  });

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchAllNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };

    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center bg-blue-500 text-white px-6 py-4 shadow-md">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="flex items-center space-x-4">
          <Link to="/user">
            <button className="bg-white text-blue-500 py-2 px-4 text-2xl rounded-md hover:bg-gray-100 transition duration-200 shadow">
              <FaHome />
            </button>
          </Link>
          <Link to="/calendar">
            <button className="bg-white text-blue-500 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200 shadow">
              Open Calendar
            </button>
          </Link>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Notifications
        </h2>

        <section className="mb-8">
          <h3 className="text-lg font-semibold text-red-500 mb-4">
            Overdue Communications
          </h3>
          {notifications.overdue.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notifications.overdue.map((company, index) => (
                <div
                  key={index}
                  className="p-4 border border-red-500 bg-red-100 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-red-700">{company.name}</h4>
                  <p className="text-sm text-gray-800 mt-2">
                    Type: {company.method}
                    <br />
                    Date: {new Date(company.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No overdue communications.</p>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold text-yellow-500 mb-4">
            Today’s Communications
          </h3>
          {notifications.today.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notifications.today.map((company, index) => (
                <div
                  key={index}
                  className="p-4 border border-yellow-500 bg-yellow-100 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-yellow-700">{company.name}</h4>
                  <p className="text-sm text-gray-800 mt-2">
                    Type: {company.method}
                    <br />
                    Date: {new Date(company.dueDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No communications due today.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notifications;
