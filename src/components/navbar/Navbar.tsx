import React, { Component } from "react";
import { Link } from "react-router-dom";
import backIcon from "../../static/images/back-icon.svg";
import "./index.sass";

export const Navbar = ({ title }: { title: string }) => {
  return (
    <div className={"navbar"}>
      <Link to={"/"} className={"navbar-back"}>
        <img src={backIcon} alt={"go back"} />
      </Link>
      <h1>{title}</h1>
    </div>
  );
};
