import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale"

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const CalendarView = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch all communications for calendar view
        axios.get('http://localhost:3500/api/calendar/getCommunications')
            .then((response) => {
                const { past, upcoming } = response.data;

                // Map communications into Big Calendar's event format
                const mappedEvents = [
                    ...past.map((comm) => ({
                        title: `${comm.companyName} - ${comm.method} ✅`,
                        start: new Date(comm.date),
                        end: new Date(comm.date),
                        allDay: true,
                        type: 'past', // Custom field for type identification
                        notes: comm.notes,
                    })),
                    ...upcoming.map((comm) => ({
                        title: `${comm.companyName} - ${comm.method} 📅`,
                        start: new Date(comm.date),
                        end: new Date(comm.date),
                        allDay: true,
                        type: 'upcoming', // Custom field for type identification
                    })),
                ];

                setEvents(mappedEvents);
            })
            .catch((error) => console.error('Error fetching calendar communications:', error));
    }, []);

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.type === 'past' ? '#d4edda' : '#ffeeba', // Green for past, Yellow for upcoming
            borderRadius: '5px',
            opacity: 0.8,
            color: 'black',
            border: 'none',
            display: 'block',
            padding: '5px',
        };
        return { style };
    };

    return (
        <div className="calendar-container">
            <h2 className="text-lg font-bold mb-4">Communication Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                eventPropGetter={eventStyleGetter}
                popup
            />
        </div>
    );

};

export default CalendarView;
