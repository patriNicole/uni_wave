import "./Login.css";
import React, { useState } from "react";
import LoginTeacher from "./LoginPeople/LoginTeacher.js";
import LoginStudent from "./LoginPeople/LoginStudent.js";
import LoginPass from "./LoginPeople/LoginPass.js";
import "../../App.css";

import logo from "../../pictures/uniwave.png";

export default function LogIn() {
  const [showTeacher, setTeacher] = useState(false);
  const [showStudent, setStudent] = useState(false);
  const [showPass, setPass] = useState(false);

  return (
    <>
      <div className="log">
        <img src={logo} alt="logo" className="logo" />
        <div className="logInContainer">
          {showTeacher && <LoginTeacher />}
          {showStudent && <LoginStudent />}
          {showPass && <LoginPass />}

          <p>Login</p>
          <label className="switchTeacher">
            <input
              type="checkbox"
              checked={showTeacher}
              onChange={() => {
                setTeacher(!showTeacher);
                if (showStudent || showPass) {
                  setStudent(false);
                  setPass(false);
                }
              }}
            />
            <span className="switch" />
          </label>

          <label className="switchStudent">
            <input
              type="checkbox"
              checked={showStudent}
              onChange={() => {
                setStudent(!showStudent);
                if (showTeacher || showPass) {
                  setTeacher(false);
                  setPass(false);
                }
              }}
            />
            <span className="switch" />
          </label>

          <label className="switchPass">
            <input
              type="checkbox"
              checked={showPass}
              onChange={() => {
                setPass(!showPass);
                if (showTeacher || showStudent) {
                  setTeacher(false);
                  setStudent(false);
                }
              }}
            />
            <span className="switch" />
          </label>
        </div>
      </div>
    </>
  );
}
