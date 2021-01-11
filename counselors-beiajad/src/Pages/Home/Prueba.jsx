import React, { useState, useContext, useEffect } from 'react'
import '../../index.css'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

export default function App() {
   const [selectedDay, setSelectedDay] = useState(null);
  return (
    <>
      <Calendar
      value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends
    />
    </>
  );
}
