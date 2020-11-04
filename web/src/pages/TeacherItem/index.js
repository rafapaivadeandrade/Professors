import React, { useState, useEffect } from "react";
import api from "../../services/api";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import "./styles.css";
function TeacherItem({ teacher }) {
  const [mergedArrays, setMergedArrays] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState([]);
  const [unSelectedSchedule, setUnselectedSchedule] = useState([]);
  const [staticSchedule, setStaticSchedule] = useState([
    { week_day: 0, value: "Sunday" },
    { week_day: 1, value: "Monday" },
    { week_day: 2, value: "Tuesday" },
    { week_day: 3, value: "Wednesday" },
    { week_day: 4, value: "Thrusday" },
    { week_day: 5, value: "Friday" },
    { week_day: 6, value: "Saturday" },
  ]);

  useEffect(() => {
    loadSchedules();
  }, [schedule]);

  function createNewConnection() {
    const token = localStorage.getItem("token");

    api.post("/connections", {
      user_id: teacher.user_id,
    });
  }

  function loadSchedules() {
    api.get(`/user/${teacher.user_id}/schedule`).then((response) => {
      setSchedule(response.data);
    });
    const array = [];
    staticSchedule.filter((staticResult) => {
      schedule.some((scheduleResult) => {
        if (scheduleResult.week_day === staticResult.week_day) {
          array.push({
            week_day: scheduleResult.week_day,
            from: scheduleResult.from / 60,
            to: scheduleResult.to / 60,
          });
        }
      });
    });
    setSelectedSchedule(array);
    setUnselectedSchedule(
      staticSchedule.filter((staticResult) => {
        return !schedule.some((scheduleResult) => {
          return scheduleResult.week_day === staticResult.week_day;
        });
      })
    );
    setMergedArrays([...selectedSchedule, ...unSelectedSchedule]);
  }

  return (
    <article key={teacher.id} className="teacher-item">
      <header>
        <img
          src={`http://192.168.15.10:3333/uploads/${teacher.avatar}`}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <div className="schedules-container">
        {mergedArrays.map((schedule, index) => {
          return (
            <div key={index}>
              <div
                className={
                  schedule.from ? "schedule-item" : "unavailable-schedule-item"
                }
              >
                <span
                  className={
                    schedule.from ? "day-label" : "day-labelUnavailable"
                  }
                >
                  Day
                </span>
                <p
                  className={schedule.from ? "dayAvailable" : "dayUnavailable"}
                >
                  {schedule.week_day == 0
                    ? "Sunday"
                    : schedule.week_day == 1
                    ? "Monday"
                    : schedule.week_day == 2
                    ? "Tuesday"
                    : schedule.week_day == 3
                    ? "Wednesday"
                    : schedule.week_day == 4
                    ? "Thusday"
                    : schedule.week_day == 5
                    ? "Friday"
                    : schedule.week_day == 6
                    ? "Saturday"
                    : ""}
                </p>
                <span
                  className={
                    schedule.from ? "hour-label" : "hour-labelUnavailable"
                  }
                >
                  Hour
                </span>
                <p className={schedule.from ? "hours" : "hours-unavailable"}>
                  {schedule.from ? schedule.from + "h-" : "-"}
                  {schedule.to ? schedule.to + "h" : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <footer>
        <p>
          Price/Hour:<strong>${teacher.cost}</strong>
        </p>
        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Contact
        </a>
      </footer>
    </article>
  );
}

export default TeacherItem;
