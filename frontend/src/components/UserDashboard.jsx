import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationBadge from './NotificationBadge';

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [notes, setNotes] = useState('');

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
    
    const openModal = (company) => {
        console.log(company);
        setSelectedCompany(company);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCompany(null);
        setNotes('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCompany) return;

        try {
            await axios.post(`http://localhost:3500/api/user/log-communication/${selectedCompany.companyId}`, {
                notes,
            });
            alert('Communication logged successfully!');
            closeModal();

            // Refresh companies to reflect updated data
            const { data } = await axios.get('http://localhost:3500/api/user/dashboard');
            setDashboardData(data);
            console.log(data)
        } catch (err) {
            console.error('Error logging communication:', err);
        }
    };

    return (
        <div>
            <nav>
                <h2>Dashboard</h2>
                {/* <NotificationBadge /> */}
            </nav>
            {!showModal && <table>
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
                                    company.lastFiveCommunications.length == 5
                                        ? '#ACE1AF' // Communication is completed
                                        : new Date(company.nextCommunication?.date) < new Date()
                                        ? 'red' // Overdue
                                        : new Date(company.nextCommunication?.date).toDateString() === new Date().toDateString()
                                        ? 'yellow' // Due today
                                        : 'white', // No issues
                            }}
                        >
                            <td>{company.companyName}</td>
                            {/* <td>
                                {company.lastFiveCommunications.map((comm, index) => (
                                    <div key={index} title={comm.notes || ''}>
                                        {comm.type} - {new Date(comm.date).toDateString()}
                                    </div>
                                ))}
                            </td> */}

                            {company.lastFiveCommunications.length == 5 ? (
                                <td>
                                    Communications Complete
                                </td>
                            ) : (
                                <td>
                                    {company.lastFiveCommunications.map((comm, index) => (
                                        <div key={index} title={comm.notes || ''}>
                                            {comm.type} - {new Date(comm.date).toDateString()}
                                        </div>
                                    ))}
                                </td>
                            )}

                            {company.lastFiveCommunications.length == 5 ? (
                                <td>
                                    Nothing scheduled
                                </td>
                            ) : (
                                <td>
                                    {company.nextCommunication?.type} -{' '}
                                    {company.nextCommunication?.date ? new Date(company.nextCommunication.date).toDateString() : 'N/A'}
                                </td>
                            )}

                            {/* // <td>
                            //         <p>Nothing Scheduled</p>
                            //     ) : (
                            //         {company.nextCommunication?.type} -{' '}
                            //         {company.nextCommunication?.date ? new Date(company.nextCommunication.date).toDateString() : 'N/A'}
                            //     )
                            //     }
                            // </td> */}
                            <td>
                                <button onClick={() => openModal(company)} disabled={company.lastFiveCommunications.length == 5}>Log Communication</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>}


            {showModal && selectedCompany && (
                <div className="modal">
                    <h2>Log Communication for {selectedCompany.companyName}</h2>
                    <form onSubmit={handleSubmit}>
                        <p>
                            <strong>Communication details: </strong>
                            {selectedCompany.nextCommunication?.type || 'N/A'} on{' '}
                            {selectedCompany.nextCommunication?.date
                                ? new Date(selectedCompany.nextCommunication.date).toLocaleDateString()
                                : 'N/A'}
                        </p>
                        <label>
                            Notes:
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

        </div>
    );
};

export default UserDashboard;
