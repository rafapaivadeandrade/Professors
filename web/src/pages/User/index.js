import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import warningIcon from "../../assets/images/icons/warning.svg";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import ProfileDropZone from "../../components/ProfileDropZone";
import "./styles.css";

const User = ({ match, navigation }) => {
  const tokenData = localStorage.getItem("token");
  const [token, setToken] = useState("");
  const history = useHistory();
  const [userId, setUserId] = useState(0);
  const [classId, setClassId] = useState(0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
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
  useEffect(() => {
    loadUser();
  }, [match.params.value]);

  async function loadUser() {
    const response = await api.get(`/user/${match.params.value}`, {
      headers: { Authorization: `Bearer ${tokenData}` },
    });
    if (!response.data) {
      alert("User needs to register class first!");
      history.push("/landing");
    }
    setClassId(response.data.class_id);
    setUserId(response.data.id);
    setName(response.data.name);
    setLastName(response.data.lastName);
    setSubject(response.data.subject);
    setImage(response.data.avatar);
    setWhatsapp(response.data.whatsapp);
    setBio(response.data.bio);
    setCost(response.data.cost);
    setEmail(response.data.email);
    const secondResponse = await api.get(
      `/user/${match.params.value}/schedule`
    );
    setScheduleItems(secondResponse.data);
  }
  const updateUser = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("lastName", lastName);
    data.append("bio", bio);
    data.append("whatsapp", whatsapp);
    data.append("subject", subject);
    data.append("cost", cost);
    if (image) {
      data.append("avatar", image);
    } else {
      alert("Please select an image to Register.");
    }
    try {
      await api.put(`/user/${userId}/${classId}`, data, {
        headers: { Authorization: `Bearer ${tokenData}` },
      });
      const response = await api.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${tokenData}` },
      });
      console.log(response);
      const { user } = response.data;
      console.log(token);
      alert(
        "User Successfully Updated! \nLog in again to see your new Profile info!"
      );
      history.push("/landing", { user: user });
    } catch (error) {
      console.log(error);
    }
  };

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
        headers: { Authorization: `Bearer ${tokenData}` },
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
    <div id="page-user-form" className="container">
      <PageHeader headerTitle="My Profile">
        <ProfileDropZone onFileUploaded={setImage} image={image} />

        <div className="imageNameContainer">
          <span className="name">
            {name} {lastName}
          </span>
          <span className="subject">{subject}</span>
        </div>
      </PageHeader>
      <main>
        <div>
          <fieldset>
            <legend>Your Info</legend>
            <div className="namenumber">
              <Input
                name="name"
                label="Name"
                placeholder="Name"
                changeWidth={320}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <Input
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
                value={lastName}
                changeWidth={320}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="namenumber">
              <Input
                name="email"
                label="E-mail"
                placeholder="E-mail"
                changeWidth={400}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                name="whatsapp"
                placeholder="( )  _  _ _ _ _  _ _ _ _"
                label="Phone Number"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
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
                  ></Select>
                  <Input
                    name="from"
                    label="from"
                    value={scheduleItems.from / 60}
                    onChange={(e) =>
                      setscheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="to"
                    value={scheduleItems.to / 60}
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
            <button type="submit" onClick={updateUser}>
              Save alterations
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default User;
