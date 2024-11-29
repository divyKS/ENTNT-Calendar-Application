import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await axios.get('http://localhost:3500/api/user/dashboard');
                setDashboardData(data);
                console.log(data)
            } catch (err) {
                alert('Failed to load dashboard data.');
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Last Five Communications</th>
                        <th>Next Scheduled Communication</th>
                    </tr>
                </thead>
                <tbody>
                    {dashboardData.map((company) => (
                        <tr
                            key={company.companyId}
                            style={{
                                backgroundColor:
                                    new Date(company.nextCommunication?.date) < new Date()
                                        ? 'red'
                                        : new Date(company.nextCommunication?.date).toDateString() ===
                                          new Date().toDateString()
                                        ? 'yellow'
                                        : 'white',
                            }}
                        >
                            <td>{company.companyName}</td>
                            <td>
                                {company.lastFiveCommunications.map((comm, index) => (
                                    <div key={index} title={comm.notes || ''}>
                                        {comm.type} - {new Date(comm.date).toDateString()}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {company.nextCommunication?.type} -{' '}
                                {company.nextCommunication?.date
                                    ? new Date(company.nextCommunication.date).toDateString()
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDashboard;
