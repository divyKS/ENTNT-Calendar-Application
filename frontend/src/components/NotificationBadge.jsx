import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
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
                setBadgeCount(10);
            } catch (error) {
                console.error('Error fetching notification count:', error);
            }
        };
        fetchBadgeCount();
    }, []);

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
