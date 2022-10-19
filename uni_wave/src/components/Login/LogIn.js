import "./Login.css";
import React, { useState } from "react";
import LoginTeacher from "./LoginPeople/LoginTeacher.js";
import LoginStudent from "./LoginPeople/LoginStudent.js";
import LoginPass from "./LoginPeople/LoginPass.js";
import "../../App.css";

import logo from "../../pictures/uniwave.png";
import logoColor from "../../pictures/logo-colorr.png";

import { BiSun, BiMoon } from "react-icons/bi";

export default function LogIn(props) {
  const [showTeacher, setTeacher] = useState(false);
  const [showStudent, setStudent] = useState(false);
  const [showPass, setPass] = useState(false);

  return (
    <>
      <div className="log">
        <div className="logInContainer">
          {showTeacher && <LoginTeacher />}
          {showStudent && <LoginStudent />}
          {showPass && <LoginPass />}

          {/* Change Backgroung Color of the Page */}
          {props.pageColor ? (
                  <>
                    <img src={logo} alt="logo" className="logo" />
                    <style>{'body { background-color: rgb(20, 0, 37) !important; } .username { color: white; } .password { color: white; } .log {background-color: #5e73eb3b !important;} .logInContainer {background-color: #5e73eb3b !important;}'}</style>
                  </>
              ) : (
                <>
                  <img src={logoColor} alt="logo" className="logo" />
                  <style>{'body { background-color: #5e73eb5 !important;}'}</style>
                </>
          )}

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

          {/* Change Backgroung Color of the Page */}
          

          <button className="bgPageColor" checked={props.pageColor}
              onClick={() => {
                props.setPageColor(!props.pageColor);
              }}>
                {props.pageColor ? (
                  <>
                    <BiMoon size={30}/>
                    <style>{'.bgPageColor {background-color: #240686 !important;}'}</style>
                  </>
              ) : (
                <>
                  <BiSun size={30}/> 
                  <style>{'.bgPageColor {background-color: rgba(33, 0, 142, 0.21) !important;}'}</style>
                </>
              )}
          </button>
        </div>
      </div>
    </>
  );
}
