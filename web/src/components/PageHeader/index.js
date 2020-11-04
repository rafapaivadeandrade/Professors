import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";
import "./styles.css";

const PageHeader = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/landing">
          <img src={backIcon} alt="Back" />
        </Link>
        <p>{props.headerTitle}</p>
        <img src={logoImg} alt="Proffy" />
      </div>
      <div className="header-content">
        <strong>{props.title}</strong>

        <div id="description">
          {props.description && <p>{props.description}</p>}
          {props.icon}
          <p>{props.postDescription}</p>
        </div>
        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
