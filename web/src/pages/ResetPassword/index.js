import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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

function ResetPassword({ match }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  // const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function reset() {
    api
      .post(`/resetPassword/${match.params.id}`, {
        email,
        password,
      })
      .then(() => {
        alert("Password was reset! \nYou are ready to log in!");
        history.push("/");
      })
      .catch(() => {
        alert("Error on reseting password");
      });
  }

  return (
    <div id="page-reset-password">
      <div id="page-container">
        <div>
          <h2 style={{ marginBottom: 20 }}>Reset Password</h2>
          {errors.email?.message && (
            <span id="reset-email-error">{errors.email?.message}</span>
          )}
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            ref={register}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          />
          {errors.email?.message ? (
            <span id="focus-border-email-error">
              <i></i>
            </span>
          ) : (
            <span id="focus-border-email">
              <i></i>
            </span>
          )}

          {errors.password?.message && (
            <span id="reset-password-error">{errors.password?.message}</span>
          )}
          <input
            type="text"
            value={password}
            placeholder="Password"
            ref={register}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          {errors.password?.message ? (
            <span id="focus-border-password-error">
              <i></i>
            </span>
          ) : (
            <span id="focus-border-password">
              <i></i>
            </span>
          )}

          <Link onClick={handleSubmit(reset)}>Reset Password</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
