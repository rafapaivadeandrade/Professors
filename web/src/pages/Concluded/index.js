import React, { useState } from "react";
import { Link } from "react-router-dom";
import checkIcon from "../../assets/images/icons/success-check-icon.svg";
import "./styles.css";

function Concluded() {
  return (
    <div id="page-concluded">
      <div id="logo-concluded">
        <div>
          <img src={checkIcon} />
          <h1 id="concluded">Registion concluded</h1>
          <h2>Now you are part of Proffy's platform.</h2>
          <h2>Have a great experience.</h2>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Concluded;
