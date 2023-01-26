import React, { useState } from "react";
import "./SingnUp.css";
import { useNavigate } from "react-router-dom";

import AlertEmailFormat from "../../Alerts/AlertWarningEmailRegistration.js";
import AlertPasswordLength from "../../Alerts/AlertWarningPasswordLength.js";

export default function LoginPass() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [alertEmail, setAlertEmail] = useState(false);
  const [alertPassword, setAlertPassword] = useState(false);
  
  //redirect to home page
  //const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(username, email, password);
    try {
      //if the email is in the right format
      if (data.email.includes("@student.manchester.ac.uk")) {
        setAlertEmail(false);

        if (data.password.length < 8) {
          setAlertPassword(true);
        } else {
          setAlertPassword(false);
          /* fetch data from API */
          /* REGISTRATION */
          await fetch("http://localhost:8000/api/users", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            //pass body to back-end
            body: JSON.stringify({
              username: data.username,
              email: data.email,
              password: data.password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "userRegistered");
            });
        }

        //navigate to home
        //navigate("/home");

      } else {
        //warning message
        setAlertEmail(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="username">
          username:
          <input
            className="input-form"
            type="text"
            name="username"
            onChange={handleChange}
						value={data.username}
            required
          />
        </label>
        <label className="email">
          email:
          <input
            className="input-form"
            type="text"
            name="email"
            onChange={handleChange}
						value={data.email}
            required
          />
        </label>
        <label className="password">
          password:
          <input
            className="input-form"
            type="password"
            name="password"
            onChange={handleChange}
						value={data.password}
            required
          />
        </label>
        <button className="button-submit" type="submit">
          Submit
        </button>
      </form>

      {error && <div>{error}</div>}
      {alertEmail && <AlertEmailFormat />}
      {alertPassword && <AlertPasswordLength />}
    </>
  );
}
