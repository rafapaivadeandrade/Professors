import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../TeacherItem/index";
import Select from "../../components/Select";
import api from "../../services/api";
import Input from "../../components/Input";
import loadingGif from "../../assets/images/loading.gif";
import smile from "../../assets/images/icons/smile.svg";
import { useHistory } from "react-router-dom";
import "./styles.css";

function TeacherList() {
  const history = useHistory();
  const [teachers, setTeachers] = useState([]);
  const [specificTeachers, setSpecificTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const divInfiniteScrollRef = React.createRef();

  function loadClasses() {
    const observer = new IntersectionObserver((entries) => {
      const ratio = entries[0].intersectionRatio;
      if (ratio > 0 && teachers.length <= total) {
        setLoading(true);
        api
          .get("pageClasses", {
            headers: { page },
          })
          .then((response) => {
            setTeachers([...teachers, ...response.data]);
            setTimeout(() => {
              setLoading(true);
            }, 3000);
            setPage(page + 1);

            if (total > 0) {
              setLoading(false);
            }
          });
      }

      setLoading(false);
    });

    observer.observe(divInfiniteScrollRef.current);
  }
  async function searchTeachers(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const observer = await new IntersectionObserver((entries) => {
      const ratio = entries[0].intersectionRatio;
      if (ratio > 0) {
        setLoading(true);
        api
          .get("classes", {
            params: {
              subject,
              week_day: weekDay,
              time,
            },
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setSpecificTeachers([...specificTeachers, ...response.data]);

            setTimeout(() => {
              setLoading(true);
            }, 2000);
            setPage(page + 1);

            if (total > 0 && teachers.length === total) {
              setLoading(false);
            }
          });

        setSearched(true);
      }
      setLoading(false);
    });
    observer.observe(divInfiniteScrollRef.current);
  }
  async function loadTotalUsers() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("totalUsers", {
        headers: { Authorization: `Bearer ${token}`, page },
      });
      setTotal(response.data.count);
    } catch (error) {
      console.error(error);
      alert(
        "Login session expired! Or  user not logged. \n Please Login again."
      );
      localStorage.clear();
      history.push("/");
    }
  }

  useEffect(() => {
    loadClasses();
  }, [page]);

  useEffect(() => {
    loadTotalUsers();
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="These are the proffys available."
        headerTitle="Study"
        description="The next step is to search and contact your proffy."
        postDescription={"We have " + total + " proffy(s)."}
        icon={<img src={smile} alt="smile" />}
      >
        <form id="search-teachers" onSubmit={searchTeachers}>
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
          <Select
            name="week_day"
            label="Week Day"
            value={weekDay}
            onChange={(e) => setWeekDay(e.target.value)}
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
            type="time"
            name="time"
            label="Hour"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </PageHeader>
      <main>
        {searched
          ? specificTeachers.map((specificTeacher, index) => {
              return <TeacherItem key={index} teacher={specificTeacher} />;
            })
          : teachers.map((teacher, index) => {
              return <TeacherItem key={index} teacher={teacher} />;
            })}

        <div ref={divInfiniteScrollRef}></div>

        <div className="end">
          <p>There is no more Proffys to show.</p>
        </div>
      </main>
    </div>
  );
}

export default TeacherList;
