import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState({ overdue: [], today: [] });

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('http://localhost:3500/api/notifications/getAll');
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>

            {/* Overdue Communications */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold text-red-500 mb-2">Overdue Communications</h3>
                {notifications.overdue.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notifications.overdue.map((company) => (
                            <div
                                key={company._id}
                                className="p-4 border border-red-500 rounded shadow"
                            >
                                <h4 className="font-bold">{company.name}</h4>
                                <p>Location: {company.location}</p>
                                <p>
                                   Type:{' '}{company.nextCommunication.type}
                                   {/* {console.log(company)} */}
                                   <br/>
                                   Date:{' '}{new Date(company.nextCommunication.date).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No overdue communications.</p>
                )}
            </section>

            {/* Today's Communications */}
            <section>
                <h3 className="text-lg font-semibold text-yellow-500 mb-2">
                    Today’s Communications
                </h3>
                {notifications.today.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notifications.today.map((company) => (
                            <div
                                key={company._id}
                                className="p-4 border border-yellow-500 rounded shadow"
                            >
                                <h4 className="font-bold">{company.name}</h4>
                                <p>Location: {company.location}</p>
                                <p>
                                   Type:{' '}{company.nextCommunication.type}
                                   {/* {console.log(company)} */}
                                   <br/>
                                   Date:{' '}{new Date(company.nextCommunication.date).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No communications due today.</p>
                )}
            </section>
        </div>
    );
};

export default Notifications;
