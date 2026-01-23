import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0)); // Jan 2026
  const [selectedDate, setSelectedDate] = useState(19);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      inactive: true,
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push({
      day: i,
      inactive: false,
    });
  }

  const changeMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction));
  };

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="font-semibold text-lg">Monthly Calendar</h2>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <h3 className="font-medium">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((item, index) => (
          <button
            key={index}
            onClick={() => !item.inactive && setSelectedDate(item.day)}
            className={`
              h-10 w-10 mx-auto rounded-lg text-sm
              ${item.inactive ? "text-gray-400" : "hover:bg-blue-100"}
              ${
                selectedDate === item.day && !item.inactive
                  ? "bg-blue-600 text-white"
                  : ""
              }
            `}
          >
            {item.day}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>Present</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span>Absent</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span>Leave</span>
        </div>
      </div>
    </div>
  );
}
