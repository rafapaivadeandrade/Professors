import React, { useState } from "react";
import logoImg from "../../assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";
import DropZone from "../../components/DropZone";
import "./styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is obligatory"),
  lastName: Yup.string().required("Last Name is obligatory"),
  email: Yup.string()
    .required("E-mail is obligatory")
    .email("Type a valid e-mail"),
  password: Yup.string().required("Password is obligatory"),
});

function Register() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [isPasswordShown, setPasswordShown] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectFile, setSelectFile] = useState();

  function togglePasswordVisibility() {
    if (!isPasswordShown) {
      setPasswordShown(true);
    } else {
      setPasswordShown(false);
    }
  }

  function RegisterUser() {
    const data = new FormData();
    data.append("name", name);
    data.append("password", password);
    data.append("email", email);
    data.append("lastName", lastName);
    if (selectFile) {
      data.append("avatar", selectFile);
    } else {
      alert("Please select an image to Register.");
    }
    api
      .post("register", data)
      .then(() => {
        alert("Registration Succeeded");
        history.push("/");
      })
      .catch(() => {
        alert("Error on register");
      });
  }

  return (
    <div id="page-register">
      <div id="register">
        <div>
          <Link to="/">
            <img src={backIcon} alt="Back" />
          </Link>
          <h1>Register</h1>
          <p>Fill the data below to register.</p>
          <DropZone onFileUploaded={setSelectFile} />
          <input
            type="text"
            placeholder="Name"
            name="name"
            style={errors.name && { borderColor: "red" }}
            ref={register}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            ref={register}
          />
          <span id="focus-border">
            <i></i>
          </span>
          {errors.name?.message && (
            <span id="register-email-error">{errors.name?.message}</span>
          )}
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            style={errors.lastName && { borderColor: "red" }}
            ref={register}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            ref={register}
          />

          <span id="focus-border">
            <i></i>
          </span>
          {errors.lastName?.message && (
            <span id="register-email-error">{errors.lastName?.message}</span>
          )}
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            ref={register}
            style={errors.email && { borderColor: "red" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span id="focus-border">
            <i></i>
          </span>
          {errors.email?.message && (
            <span id="register-email-error">{errors.email?.message}</span>
          )}

          <div id="password-container">
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder="Password"
              name="password"
              style={errors.password && { borderColor: "red" }}
              ref={register}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              ref={register}
            />
            <button id="eye" onClick={togglePasswordVisibility}>
              {isPasswordShown ? (
                <FiEye color="#a8a8b3" />
              ) : (
                <FiEyeOff color="#a8a8b3" />
              )}
            </button>
          </div>

          {errors.password?.message && (
            <span id="register-password-error">{errors.password?.message}</span>
          )}
          <button type="button" onClick={handleSubmit(RegisterUser)}>
            Register
          </button>
        </div>
      </div>
      <div id="empty-container"></div>
      <div id="logo-container1">
        <div>
          <img src={logoImg} alt="Proffy" />
          <h2>Your platform of online studies</h2>
        </div>
      </div>
    </div>
  );
}

export default Register;
