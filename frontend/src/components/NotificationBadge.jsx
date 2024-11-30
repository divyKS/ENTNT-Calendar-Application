import React, { useEffect, useState } from 'react';
// import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { Link } from "react-router";

const NotificationBadge = () => {
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
        const fetchBadgeCount = async () => {
            try {
                const { data } = await axios.get('http://localhost:3500/api/notifications/getAll');
                // console.log(data);
                const total = data.overdue.length + data.today.length;
                setBadgeCount(total);
            } catch (error) {
                console.error('Error fetching notification count:', error);
            }
        };
        fetchBadgeCount();
    }, []);

    return (
        <div className="relative">
            {/* <FaBell className="text-2xl text-gray-600" /> */}
            <Link to="/notifs">
                Notification - {badgeCount}
            </Link>
            {/* {badgeCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {badgeCount}
                </span>
            )} */}
        </div>
    );
};

export default NotificationBadge;