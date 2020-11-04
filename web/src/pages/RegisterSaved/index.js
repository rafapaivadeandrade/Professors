import React from "react";
import { Link } from "react-router-dom";
import checkIcon from "../../assets/images/icons/success-check-icon.svg";
import "./styles.css";

function RegisterSaved() {
  return (
    <div id="page-concluded">
      <div id="logo-concluded">
        <div>
          <img src={checkIcon} />
          <h1 id="concluded">Register Saved!</h1>
          <h2>Everything's good, your register is in our professors list.</h2>
          <h2>Now you just need to keep your eyes in your Whatsapp.</h2>
          <Link to="/landing">Back to main page.</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterSaved;
