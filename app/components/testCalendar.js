// components/CalendarComponent.js
'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="p-2 border rounded-lg"
          calendarClassName="p-2 border rounded-lg"
        />
      </div>
      {selectedDate && (
        <div className="mt-4 text-lg font-semibold text-blue-600">
          Selected Date: {selectedDate.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
