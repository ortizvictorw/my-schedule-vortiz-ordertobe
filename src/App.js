import React, { useState, useEffect } from "react";
import "./App.css";

const regularSchedule = [
  { time: "08:00 - 08:30", activity: "Entrenamiento" },
  { time: "08:30 - 11:30", activity: "Trabajo" },
  { time: "11:30 - 12:00", activity: "Pausa" },
  { time: "12:00 - 13:00", activity: "Almuerzo" },
  { time: "13:00 - 15:30", activity: "Trabajo" },
  { time: "15:30 - 17:00", activity: "Trabajo" },
  { time: "17:00 - 17:30", activity: "Buscar a hija" },
  { time: "17:30 - 18:00", activity: "Lectura" },
];

const thursdaySchedule = [
  { time: "08:00 - 08:30", activity: "Entrenamiento" },
  { time: "08:30 - 10:30", activity: "Trabajo" },
  { time: "10:30 - 11:00", activity: "Pausa" },
  { time: "11:00 - 12:00", activity: "Reunión" },
  { time: "12:00 - 13:00", activity: "Almuerzo" },
  { time: "13:00 - 15:30", activity: "Trabajo" },
  { time: "15:30 - 17:00", activity: "Lectura" },
  { time: "17:00 - 17:30", activity: "Buscar a hija" },
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

      schedule.forEach((slot) => {
        const [start, end] = slot.time.split(" - ");
        if (currentTime >= start && currentTime < end) {
          setCurrentActivity(slot.activity);
        }
      });
    }, 1000); // Actualiza cada minuto

    return () => clearInterval(interval);
  }, [schedule]); // Depende de "schedule" para cambiar según el día

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
