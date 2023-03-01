import "./SingnUp.css";
import React, { useState } from "react";
import LoginTeacher from "./SignUpPeople/SingnUpTeacher.js";
import LoginStudent from "./SignUpPeople/SingnUpStudent.js";
import LoginPass from "./SignUpPeople/SingnUpPass.js";
import "../../App.css";

export default function LogIn(props) {
  const [showTeacher, setTeacher] = useState(false);
  const [showStudent, setStudent] = useState(false);
  const [showPass, setPass] = useState(false);

  return (
    <>
      <LoginPass />
      {/*{showTeacher && <LoginTeacher />}
      {showStudent && <LoginStudent />}
      {showPass && <LoginPass />}*/}

      {/*<label className="switchTeacher">
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
        </label>*/}
    </>
  );
}
