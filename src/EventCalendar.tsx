import React, { useState } from "react";
import {
  eachDayOfInterval,
  format,
  lastDayOfMonth,
  startOfMonth,
  getDay,
  isToday,
  isSameDay,
} from "date-fns";
import clsx from "clsx";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Event {
  date: Date;
  title: string;
}

const EventCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]); // State for events

  const currentDate = new Date();

  // Get the first and last day of the current month
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonthDate = lastDayOfMonth(currentDate);

  // Get all the days in the current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonthDate,
  });

  // Calculate empty slots to make the first day start on Tuesday
  const firstDayIndex = getDay(firstDayOfMonth); // Index of the first day (0 = Sunday)
  const offset = (firstDayIndex + 6) % 7; // Shift so the first day starts on Tuesday

  return (
    <div className="container p-4 mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-center">{format(currentDate, "MMMM yyyy")}</h2>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2">
        {weekdays.map((day) => (
          <div key={day} className="font-bold text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Days in Month */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots for days before the first day of the month */}
        {Array.from({ length: offset }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2 text-center border rounded-md"></div>
        ))}

        {/* Render all days in the month */}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={clsx("border rounded-md p-2 text-center", {
              "bg-gray-200": isToday(day),
              "text-gray-900": isToday(day),
            })}
          >
            {format(day, "d")}
            {/* Render events for this day */}
            {events
              .filter((event) => isSameDay(event.date, day))
              .map((event) => (
                <div key={event.title} className="mt-1 text-sm text-gray-900 bg-green-500 rounded-md">
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;