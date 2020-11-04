import React, { useState } from "react";
import logoImg from "../../assets/images/logo.svg";
import { useHistory } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail is obligatory")
    .email("Type a valid e-mail"),
});

function ForgotPassword() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [email, setEmail] = useState("");

  function sendToSuccessfullEmailSent() {
    api.post("/forgotPassword", {
      email: email,
    });

    history.push("/redefinitionSent");
  }

  return (
    <div id="page-forgot">
      <div id="forgot">
        <div>
          <Link to="/">
            <img src={backIcon} alt="Back" />
          </Link>
          <h1>Did you forget the password?</h1>
          <p>Do not worry, we will help you.</p>

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
          {errors.email?.message && (
            <span id="email-error">{errors.email?.message}</span>
          )}
          {errors.email?.message ? (
            <span id="focus-border-error">
              <i></i>
            </span>
          ) : (
            <span id="focus-border">
              <i></i>
            </span>
          )}

          <button
            type="button"
            onClick={handleSubmit(sendToSuccessfullEmailSent)}
          >
            Send
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

export default ForgotPassword;
