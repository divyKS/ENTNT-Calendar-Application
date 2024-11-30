import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';


const CalendarView = () => {
    const [communications, setCommunications] = useState({ past: [], upcoming: [] });
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        // Fetch calendar communications for all companies
        axios.get('http://localhost:3500/api/calendar/getCommunications')
        .then((res) => setCommunications(res.data))
        
            .catch((err) => console.error('Error fetching calendar data:', err));
    }, []);

    useEffect(()=>{
        console.log(communications);
    }, [communications])

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = date.toDateString();

            const past = communications.past.filter(
                (comm) => new Date(comm.date).toDateString() === formattedDate
            );
            const upcoming = communications.upcoming.filter(
                (comm) => new Date(comm.date).toDateString() === formattedDate
            );

            return (
                <div>
                    {past.length > 0 && <div>✅ {past.length}</div>}
                    {upcoming.length > 0 && <div>📅 {upcoming.length}</div>}
                    
                    {/* {past.map((comm, index) => (
                        <div key={index} className="bg-green-200 text-xs p-1 rounded">
                            ✅ {comm.companyName} - {comm.method}
                        </div>
                    ))}
                    {upcoming.map((comm, index) => (
                        <div key={index} className="bg-yellow-200 text-xs p-1 rounded">
                            📅 {comm.companyName} - {comm.method}
                        </div>
                    ))} */}
                </div>
            );
        }
        return null;
    };

    const getDetailsForDate = (date) => {
        const formattedDate = date.toDateString();

        const past = communications.past.filter(
            (comm) => new Date(comm.date).toDateString() === formattedDate
        );
        const upcoming = communications.upcoming.filter(
            (comm) => new Date(comm.date).toDateString() === formattedDate
        );

        return { past, upcoming };
    };

    const detailsForSelectedDate = getDetailsForDate(selectedDate);

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Communication Calendar</h2>
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileContent={tileContent}
                className={["w-96"]}
            />
            {selectedDate && (
                <div className="mt-4">
                    <h3 className="text-md font-semibold">Details for {selectedDate.toDateString()}</h3>
                    <div>
                        <h4 className="font-medium">Past Communications:</h4>
                        {detailsForSelectedDate.past.length > 0 ? (
                            detailsForSelectedDate.past.map((comm, index) => (
                                <p key={index}>
                                    <strong>{comm.companyName}</strong>: {comm.method} - {comm.notes}
                                </p>
                            ))
                        ) : (
                            <p>No past communications.</p>
                        )}
                    </div>
                    <div>
                        <h4 className="font-medium">Upcoming Communications:</h4>
                        {detailsForSelectedDate.upcoming.length > 0 ? (
                            detailsForSelectedDate.upcoming.map((comm, index) => (
                                <p key={index}>
                                    <strong>{comm.companyName}</strong>: {comm.method} - Scheduled for{' '}
                                    {new Date(comm.date).toLocaleDateString()}
                                </p>
                            ))
                        ) : (
                            <p>No upcoming communications.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
    



};

export default CalendarView;
