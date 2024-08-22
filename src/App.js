import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const regularSchedule = [
  { time: "08:00 - 08:30", activity: "Entrenamiento", id: 1 },
  { time: "08:30 - 10:30", activity: "Trabajo", id: 2 },
  { time: "10:30 - 11:00", activity: "Pausa", id: 3 },
  { time: "11:00 - 11:50", activity: "Trabajo", id: 4 },
  { time: "11:50 - 12:15", activity: "Recoger", id: 5 },
  { time: "12:15 - 13:00", activity: "Almuerzo", id: 6 },
  { time: "13:00 - 13:50", activity: "Trabajo", id: 7 },
  { time: "13:50 - 14:15", activity: "Llevar", id: 8 },
  { time: "14:15 - 16:20", activity: "Trabajo", id: 9 },
  { time: "16:20 - 16:50", activity: "Lectura", id: 10 },
  { time: "16:50 - 17:15", activity: "Recoger", id: 11 },
  { time: "17:15 - 18:00", activity: "Lectura", id: 12 },
];

const thursdaySchedule = [
  { time: "08:00 - 08:30", activity: "Entrenamiento", id: 1 },
  { time: "08:30 - 10:30", activity: "Trabajo", id: 2 },
  { time: "10:30 - 11:00", activity: "Pausa", id: 3 },
  { time: "11:00 - 11:50", activity: "Reunión", id: 4 },
  { time: "11:50 - 12:15", activity: "Recoger", id: 5 },
  { time: "12:15 - 13:00", activity: "Almuerzo", id: 6 },
  { time: "13:00 - 13:50", activity: "Trabajo", id: 7 },
  { time: "13:50 - 14:15", activity: "Llevar", id: 8 },
  { time: "14:15 - 16:20", activity: "Trabajo", id: 9 },
  { time: "16:20 - 16:50", activity: "Lectura", id: 10 },
  { time: "16:50 - 17:15", activity: "Recoger", id: 11 },
  { time: "17:15 - 18:00", activity: "Lectura", id: 12 },

];

const calculateTotalHours = (schedule, activityType) => {
  const totalMinutes = schedule.reduce((total, slot) => {
    const [start, end] = slot.time.split(" - ");
    if (slot.activity === activityType) {
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);
      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;
      return total + (endTime - startTime);
    }
    return total;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const App = () => {
  const [currentActivity, setCurrentActivity] = useState("");
  const [currentActivityId, setCurrentActivityId] = useState("");

  const [schedule, setSchedule] = useState(regularSchedule);

  const audioRefs = {
    almuerzo: useRef(null),
    entrenamiento: useRef(null),
    llevar: useRef(null),
    pausa: useRef(null),
    recoger: useRef(null),
    reunion: useRef(null),
    trabajo: useRef(null),
  };

  useEffect(() => {
    const updateSchedule = () => {
      const now = new Date();
      const currentTime = now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2);
      const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 4 = Thursday

      const currentSchedule = dayOfWeek === 4 ? thursdaySchedule : regularSchedule;
      setSchedule(currentSchedule);

      let activityFound = false;
      currentSchedule.forEach((slot) => {
        const [start, end] = slot.time.split(" - ");
        if (currentTime >= start && currentTime < end) {
          if (currentActivity !== slot.activity) {
            setCurrentActivity(slot.activity);
            setCurrentActivityId(slot.id);

            if (audioRefs[slot.activity.toLowerCase()]) {
              audioRefs[slot.activity.toLowerCase()].current.play();
            }
          }
          activityFound = true;
        }
      });

      if (!activityFound) {
        setCurrentActivity("");
        setCurrentActivityId("");
      }
    };

    updateSchedule();
    const interval = setInterval(updateSchedule, 60000); // Updates every minute

    return () => clearInterval(interval);
  }, [currentActivity]);

  const totalWorkHours = calculateTotalHours(schedule, "Trabajo");
  const totalMeetingHours = calculateTotalHours(schedule, "Reunión");

  return (
    <div className="App">
      <h1>Horario de Victor</h1>
      <div className="schedule">
        {schedule.map((slot, index) => (
          <div
            key={index}
            className={`slot ${currentActivityId === slot.id ? "current" : ""}`}
          >
            <span>{slot.time}</span> - <span>{slot.activity}</span>
          </div>
        ))}
      </div>
      <div className="totals">
        <h2>Total de horas de trabajo: {totalWorkHours}</h2>
        <h2>Total de horas de reunión: {totalMeetingHours}</h2>
      </div>
      <audio ref={audioRefs.almuerzo} src="/sound/notification_almuerzo.mp3" />
      <audio ref={audioRefs.entrenamiento} src="/sound/notification_entrenamiento.mp3" />
      <audio ref={audioRefs.llevar} src="/sound/notification_llevar.mp3" />
      <audio ref={audioRefs.pausa} src="/sound/notification_pausa.mp3" />
      <audio ref={audioRefs.recoger} src="/sound/notification_recoger.mp3" />
      <audio ref={audioRefs.reunion} src="/sound/notification_reunion.mp3" />
      <audio ref={audioRefs.trabajo} src="/sound/notification_trabajo.mp3" />
    </div>
  );
};

export default App;
