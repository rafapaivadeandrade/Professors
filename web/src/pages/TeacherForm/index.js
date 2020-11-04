import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import warningIcon from "../../assets/images/icons/warning.svg";
import rocketIcon from "../../assets/images/icons/rocket.svg";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";

import "./styles.css";

const TeacherForm = ({ match }) => {
  const [token, setToken] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState(0);
  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: "",
      to: "",
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }
  function removeNewScheduleItem(index) {
    const indexToDelete = scheduleItems.findIndex(
      (scheduleItem) => scheduleItem.id === index
    );

    scheduleItems.splice(indexToDelete, 1);
    setScheduleItems([...scheduleItems]);
  }
  async function handleCreateClass(e) {
    e.preventDefault();
    const whatsappToReplace = phoneNumber.replace(/[()-]/g, "");
    const whatsapp = whatsappToReplace.replace(/\s/g, "");
    try {
      await api.post("classes", {
        email: user.email,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });
      alert("Successful Registration");

      history.push("/registrationSaved");
    } catch (error) {
      alert("Error on Register");
      if (token === "") {
        alert(
          "Login session expired! Or no user logged. \n Please Login again."
        );
        localStorage.clear();
        history.push("/");
      }
    }
  }

  function setscheduleItemValue(position, field, value) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  async function loadTotalConnections() {
    try {
      const token = localStorage.getItem("token");
      setToken(token);
      await api.get("/connections", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      alert("Login session expired! Or no user logged. \n Please Login again.");
      localStorage.clear();
      history.push("/");
    }
  }

  useEffect(() => {
    loadTotalConnections();
  }, []);
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        headerTitle="Give Classes"
        title="Great that you want to teach classes."
        description="The first step is to fulfill the inscription form."
        postDescription="Get ready! Will be awesome."
        icon={<img src={rocketIcon} alt="rocket Icon." />}
      ></PageHeader>
      <main>
        <div>
          <fieldset>
            <legend>Your Info</legend>
            <div className="namenumber">
              <p>
                Name: {user.name} {user.lastName}
              </p>

              <Input
                name="whatsapp"
                placeholder="( )  _  _ _ _ _  _ _ _ _"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                maskBoolean={true}
              />
            </div>

            <TextArea
              name="bio"
              label="Biography"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>
          <br />

          <fieldset>
            <legend>About the class</legend>
            <Select
              name="subject"
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: "Web Development", label: "Web Development" },
                { value: "Mobile", label: "Mobile" },
                { value: "Network", label: "Network" },
                { value: "Database", label: "Database" },
                { value: "Business", label: "Business" },
              ]}
            />
            <Input
              name="cost"
              placeholder="$"
              label="Cost per hour"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              step="2"
            />
          </fieldset>
          <br />
          <fieldset>
            <legend>
              Availability
              <button type="button" onClick={addNewScheduleItem}>
                + New Schedule
              </button>
            </legend>

            {scheduleItems.map((scheduleItems, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Week Day"
                    value={scheduleItems.week_day}
                    onChange={(e) =>
                      setscheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Sunday" },
                      { value: "1", label: "Monday" },
                      { value: "2", label: "Tuesday" },
                      { value: "3", label: "Wednesday" },
                      { value: "4", label: "Thrusday" },
                      { value: "5", label: "Friday" },
                      { value: "6", label: "Saturday" },
                    ]}
                  />
                  <Input
                    name="from"
                    label="from"
                    type="time"
                    value={scheduleItems.from}
                    onChange={(e) =>
                      setscheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="to"
                    type="time"
                    value={scheduleItems.to}
                    onChange={(e) =>
                      setscheduleItemValue(index, "to", e.target.value)
                    }
                  />
                  <div className="delete-container">
                    <button
                      className="delete"
                      onClick={() => removeNewScheduleItem(index)}
                    >
                      Delete Hour
                    </button>
                  </div>
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Important warning" />
              Important! <br />
              Fill all the information correctly.
            </p>
            <button type="button" onClick={handleCreateClass}>
              Register
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default TeacherForm;
