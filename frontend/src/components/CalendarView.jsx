import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useNavigate } from "react-router";

const locales = {
  "en-US": enUS,
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all communications for calendar view
    axios
      .get("http://localhost:3500/api/calendar/getCommunications")
      .then((response) => {
        const { past, upcoming } = response.data;

        // Map communications into Big Calendar's event format
        const mappedEvents = [
          ...past.map((comm) => ({
            title: `${comm.companyName} - ${comm.method} ✅`,
            start: new Date(comm.date),
            end: new Date(comm.date),
            allDay: true,
            type: "past", // Custom field for type identification
            notes: comm.notes,
          })),
          ...upcoming.map((comm) => ({
            title: `${comm.companyName} - ${comm.method} 📅`,
            start: new Date(comm.date),
            end: new Date(comm.date),
            allDay: true,
            type: "upcoming", // Custom field for type identification
          })),
        ];

        setEvents(mappedEvents);
      })
      .catch((error) =>
        console.error("Error fetching calendar communications:", error)
      );
  }, []);

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.type === "past" ? "#d4edda" : "#ffeeba", // Green for past, Yellow for upcoming
      borderRadius: "5px",
      opacity: 0.8,
      color: "black",
      border: "none",
      display: "block",
      padding: "5px",
    };
    return { style };
  };

  const handleClickOutside = (event) => {
    const calendarElement = document.getElementById("calendar"); // Set an id for your calendar container
    if (calendarElement && !calendarElement.contains(event.target)) {
      setSelectedEvent(null); // Clear the selected event
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSelectEvent = (event) => {
    setSelectedEvent(event); // Set the clicked event
  };

  return (
    <div className="calendar-container flex flex-col items-center">
      <h2 className="text-lg font-bold mb-16 mt-16">Communication Calendar</h2>

      <div className="w-full flex items-center justify-around space-x-10">
        <div className={`w-6/12`} id="calendar">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={onSelectEvent}
            popup
          />
        </div>

        {selectedEvent && (
          <div className="w-2/12 mt-4 p-4 border border-gray-300 rounded shadow">
            <h3 className="text-lg font-bold">Event Details</h3>
            <p>
              <strong>Company:</strong>{" "}
              {selectedEvent.title.split("-")[0].trim()}
            </p>
            <p>
              <strong>Method:</strong>{" "}
              {selectedEvent.title.split("-")[1].trim()}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedEvent.start).toLocaleDateString()}
            </p>
            <p>
              <strong>Notes:</strong>{" "}
              {selectedEvent.notes ? selectedEvent.notes : "N/A"}
            </p>
          </div>
        )}

        {!selectedEvent && (
          <div className="w-2/12 mt-4 p-4 border border-gray-300 rounded shadow flex flex-col items-center">
            <h3 className="text-lg font-bold">Select an event to see details</h3>
            <div className="opacity-0">
                <p>
                <strong>Company:</strong>{" "}
                </p>
                <p>
                <strong>Method:</strong>{" "}
                </p>
                <p>
                <strong>Date:</strong>{" "}
                </p>
                <p>
                <strong>Notes:</strong>{" "}
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
