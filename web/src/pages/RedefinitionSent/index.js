import React from "react";
import { Link } from "react-router-dom";
import checkIcon from "../../assets/images/icons/success-check-icon.svg";
import "./styles.css";

function RedefinitionSent() {
  return (
    <div id="page-concluded">
      <div id="logo-concluded">
        <div>
          <img src={checkIcon} />
          <h1 id="concluded">Redefinition Sent</h1>
          <h2>Well, you just need to check the e-mail that was sent to you</h2>
          <h2>redefine your password and enjoy your studies.</h2>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RedefinitionSent;
