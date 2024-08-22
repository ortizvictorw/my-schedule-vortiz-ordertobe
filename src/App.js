import React, { useState, useEffect } from "react";
import "./App.css";

const regularSchedule = [
  { time: "08:00 - 08:30", activity: "Entrenamiento" },
  { time: "08:30 - 11:30", activity: "Trabajo" },
  { time: "11:30 - 12:00", activity: "Pausa" },
  { time: "12:00 - 12:15", activity: "Recoger" },
  { time: "12:15 - 13:00", activity: "Almuerzo" },
  { time: "13:00 - 14:00", activity: "Trabajo" },
  { time: "14:00 - 14:15", activity: "Llevar" },
  { time: "14:15 - 15:30", activity: "Trabajo" },
  { time: "15:30 - 16:50", activity: "Trabajo" },
  { time: "16:50 - 17:15", activity: "Recoger" },
  { time: "17:15 - 18:00", activity: "Lectura" },
];

const thursdaySchedule = [
  { time: "08:00 - 08:30", activity: "Entrenamiento" },
  { time: "08:30 - 10:30", activity: "Trabajo" },
  { time: "10:30 - 11:00", activity: "Pausa" },
  { time: "11:00 - 11:50", activity: "Reunión" },
  { time: "11:50 - 12:15", activity: "Recoger" },
  { time: "12:15 - 13:00", activity: "Almuerzo" },
  { time: "13:00 - 14:00", activity: "Trabajo" },
  { time: "14:00 - 14:15", activity: "Llevar" },
  { time: "14:15 - 15:30", activity: "Trabajo" },
  { time: "15:30 - 16:50", activity: "Lectura" },
  { time: "16:50 - 17:15", activity: "Recoger" },
];

const App = () => {
  const [currentActivity, setCurrentActivity] = useState("");
  const [schedule, setSchedule] = useState(regularSchedule);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2);
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday

      // Use Thursday schedule if today is Thursday (day 4)
      if (dayOfWeek === 4) {
        setSchedule(thursdaySchedule);
      } else {
        setSchedule(regularSchedule);
      }

      let activityFound = false; // Flag to check if activity is found
      schedule.forEach((slot) => {
        const [start, end] = slot.time.split(" - ");
        if (currentTime >= start && currentTime < end) {
          if (currentActivity !== slot.activity) {
            setCurrentActivity(slot.activity);
            // Play notification sound
            const audio = new Audio(`/notification_${slot.activity.toLowerCase().replace(/\s+/g, '_')}.mp3`);
            audio.play();
          }
          activityFound = true;
        }
      });

      // Reset currentActivity if no activity is found in the current time range
      if (!activityFound) {
        setCurrentActivity("");
      }
    }, 1000); // Actualiza cada minuto

    return () => clearInterval(interval);
  }, [schedule, currentActivity]); // Depende de "schedule" y "currentActivity"

  return (
    <div className="App">
      <h1>Horario de Victor</h1>
      <div className="schedule">
        {schedule.map((slot, index) => (
          <div
            key={index}
            className={`slot ${currentActivity === slot.activity ? "current" : ""}`}
          >
            <span>{slot.time}</span> - <span>{slot.activity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
