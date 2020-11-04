import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

function Landing() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const tokenData = localStorage.getItem("token");
  const history = useHistory();
  const location = useLocation();
  const [totalConnections, setTotalConnections] = useState(0);
  const [token, setToken] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!user) {
      const user = location.state.user;

      setUser(user);
    }
    setToken(tokenData);
    loadTotalConnections();
    loadUser();
  }, [tokenData]);

  function loadUser() {
    try {
      api
        .get(`/user/${userData.id}`, {
          headers: { Authorization: `Bearer ${tokenData}` },
        })
        .then((response) => {
          setUser(response.data);
        });
    } catch (err) {
      alert("Login session expired! Or no user logged. \n Please Login again.");
      localStorage.clear();
      history.push("/");
    }
  }

  function loadTotalConnections() {
    try {
      api
        .get("/connections", {
          headers: { Authorization: `Bearer ${tokenData}` },
        })
        .then((response) => {
          const { total } = response.data;
          setTotalConnections(total);
        });
    } catch (error) {
      alert("Login session expired! Or no user logged. \n Please Login again.");
      localStorage.clear();
      history.push("/");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <Link
          className="userNameImage"
          to={user ? "/profile/" + user.id : "/profile/" + userData.id}
        >
          <img
            src={
              user
                ? `http://192.168.15.10:3333/uploads/${user.avatar}`
                : `http://192.168.15.10:3333/uploads/${userData.avatar}`
            }
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginBottom: 20,
            }}
          />{" "}
          <span className="user-name">{user ? user.name : userData.name}</span>
          <span className="user-lastname">
            {" "}
            {user ? user.lastName : userData.lastName}
          </span>
        </Link>
        <button
          className="logout"
          type="button"
          onClick={() => {
            handleLogout();
          }}
        >
          <FiPower size={18} color="#FFFFFF" />
        </button>
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your platform of online studies.</h2>
        </div>{" "}
        <img src={landingImg} alt="Studies Platform" className="hero-image" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Study" />
            Study
          </Link>
          <Link to="/give-classes/" className="give-classes">
            {" "}
            <img src={giveClassesIcon} alt="Study" />
            Teach Classes
          </Link>
        </div>
        <span className="total-connections">
          Total of {totalConnections} connections already done
          <img src={purpleHeartIcon} alt="Purple Heart" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
