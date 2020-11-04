import React, { useState, useEffect } from "react";
import logoImg from "../../assets/images/logo.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import checkIcon from "../../assets/images/icons/success-check-icon.svg";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./styles.css";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail is obligatory")
    .email("Type a valid e-mail"),
  password: Yup.string().required("Password is obligatory"),
});

function Login() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [isPasswordShown, setPasswordShown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const boolean = localStorage.getItem("remember");

  useEffect(() => {
    if (boolean) {
      setEmail(localStorage.getItem("email"));
      setPassword(localStorage.getItem("password"));
    }
    if (!boolean) {
      setEmail("");
      setPassword("");
    }
  }, [boolean]);

  async function onSubmit(e) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      if (rememberMe && email !== "" && password !== "") {
        localStorage.setItem("remember", rememberMe);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }
      if (!rememberMe) {
        localStorage.setItem("remember", false);
      }
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // api.defaults.headers.authorization = `Bearer ${token}`;

      history.push("/landing");
    } catch (err) {
      console.log(err);
      alert("Fail to login, try again");
    }
  }

  function rememberInfo() {
    if (!rememberMe) {
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }

  function togglePasswordVisibility() {
    if (!isPasswordShown) {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
    }
  }
  return (
    <div id="page-login">
      <div id="logo-container">
        <div>
          <img src={logoImg} alt="Proffy" />
          <h2>Your platform of online studies</h2>
        </div>
      </div>

      <div id="login">
        <h1>Login</h1>
        {errors.email?.message && (
          <span id="email-error">{errors.email?.message}</span>
        )}
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          ref={register}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span id="focus-border">
          <i></i>
        </span>

        {errors.password?.message && (
          <span id="password-error">{errors.password?.message}</span>
        )}
        <div>
          <input
            type={isPasswordShown ? "text" : "password"}
            placeholder="Password"
            name="password"
            ref={register}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span id="focus-border">
            <i></i>
          </span>

          <button id="eye" onClick={togglePasswordVisibility}>
            {isPasswordShown ? (
              <FiEye color="#a8a8b3" />
            ) : (
              <FiEyeOff color="#a8a8b3" />
            )}
          </button>
          <button id="check" onClick={rememberInfo}>
            {rememberMe ? (
              <img src={checkIcon} />
            ) : (
              <input type="checkbox" color="#a8a8b3" />
            )}
          </button>
          <div>
            <a onClick={rememberInfo}>Remember me</a>
            <Link to="/forgotPassword" color="#a8a8b3" className="forgot">
              Forgot my password
            </Link>
          </div>

          <button type="submit" onClick={handleSubmit(onSubmit)}>
            Join
          </button>
          <footer>
            <p>Don't have an account?</p>
            <p>
              It is for free <img src={purpleHeartIcon} alt="purpleHeartIcon" />
            </p>
            <br />
          </footer>
          <Link to="/register" id="registerLink" color="#6A6180">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
