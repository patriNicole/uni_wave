import "./HomePage.css";
import React, { useState } from "react";
import "../../App.css";

//import tabs from react-bootstrap
import Tab from "../../../node_modules/react-bootstrap/Tab";
import Tabs from "../../../node_modules/react-bootstrap/Tabs";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

//login & signup pages
import SignUp from "../SignUp/SingnUp.js";
import LogIn from "../Login/LogIn.js";

import logo from "../../pictures/uniwave.png";
import logoColor from "../../pictures/logo-colorr.png";

import { BiSun, BiMoon } from "react-icons/bi";

export default function HomePage(props) {

  return (
    <div>
      <div className="logInContainer">
        {/* Change Backgroung Color of the Page */}
        {props.pageColor ? (
          <>
            <img src={logo} alt="logo" className="logo" />
            <style>
              {
                "body { background-color: rgb(20, 0, 37) !important; } .username { color: white; } .password { color: white; } .log {background-color: #5e73eb3b !important;} .logInContainer {background-color: #5e73eb3b !important;}"
              }
            </style>
          </>
        ) : (
          <>
            <img src={logoColor} alt="logo" className="logo" />
            <style>{"body { background-color: #5e73eb5 !important;}"}</style>
          </>
        )}
      </div>

      {/* Change Backgroung Color of the Page */}

      <button
        className="bgPageColor"
        checked={props.pageColor}
        onClick={() => {
          props.setPageColor(!props.pageColor);
        }}
      >
        {props.pageColor ? (
          <>
            <BiMoon size={30} />
            <style>
              {".bgPageColor {background-color: #240686 !important;}"}
            </style>
          </>
        ) : (
          <>
            <BiSun size={30} />
            <style>
              {
                ".bgPageColor {background-color: rgba(33, 0, 142, 0.21) !important;}"
              }
            </style>
          </>
        )}
      </button>

      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="tabs-registration"
        justify
      >
        <Tab eventKey="signup" title="SignUp" className="font-registration">
          <SignUp />
        </Tab>
        <Tab eventKey="login" title="LogIn" className="font-registration">
          <LogIn />
        </Tab>
      </Tabs>
    </div>
  );
}
