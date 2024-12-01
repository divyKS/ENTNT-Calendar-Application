import React from "react";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router";

const NotificationBadge = ({ badgeCount }) => {
  return (
    <div className="relative">
      <Link to="/notifs">
        <FaBell className="text-2xl text-white-400" />
        {badgeCount > 0 && (
          <span className="absolute -top-2 left-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {badgeCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default NotificationBadge;
