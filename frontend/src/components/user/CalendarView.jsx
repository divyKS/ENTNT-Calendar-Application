import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useNavigate } from "react-router";
import { getCalendarCommunications } from "../../api";

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
    const fetchCommunications = async () => {
      try {
        const { past, upcoming } = await getCalendarCommunications();

        // Map communications into Big Calendar's event format
        const mappedEvents = [
          ...past.map((comm) => ({
            title: `${comm.companyName} - ${comm.method}`,
            start: new Date(comm.date),
            end: new Date(comm.date),
            allDay: true,
            type: "past", // Custom field for type identification
            complete: comm.complete,
            notes: comm.notes,
          })),
          ...upcoming.map((comm) => ({
            title: `${comm.companyName} - ${comm.method}`,
            start: new Date(comm.date),
            end: new Date(comm.date),
            allDay: true,
            type: "upcoming", // Custom field for type identification
            complete: comm.complete,
          })),
        ];

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching and mapping calendar communications:", error);
      }
    };

    fetchCommunications();
  }, []);

  const eventStyleGetter = (event) => {
    let backgroundColor;
    if (event.complete) {
      backgroundColor = "#d4edda";
    } else if (event.type === "past") {
      backgroundColor = "#FF3131";
    } else if (event.type === "upcoming") {
      backgroundColor = "#ffeeba";
    } else {
      backgroundColor = "white";
    }
  
    const style = {
      backgroundColor,
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
    const calendarElement = document.getElementById("calendar");
    if (calendarElement && !calendarElement.contains(event.target)) {
      setSelectedEvent(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="calendar-container flex flex-col items-center p-4">
      <div className="flex items-center justify-between w-full mb-16 mt-16">
        <h2 className="text-2xl font-bold">Communication Calendar</h2>
        <button
          onClick={() => navigate("/user")}
          className="text-blue-500 hover:underline text-2xl"
        >
          Close
        </button>
      </div>

      <div className="w-full flex items-center justify-around space-x-10">
        <div className={`w-4/5`} id="calendar">
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

        <div
          className={`w-1/5 mt-4 p-4 border border-gray-300 rounded shadow flex flex-col justify-center items-center`}
          style={{ height: "600px" }}
        >
          {selectedEvent ? (
            <>
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
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-bold">
                Select an event to see details
              </h3>
              <p className="text-gray-500">
                The details will be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
