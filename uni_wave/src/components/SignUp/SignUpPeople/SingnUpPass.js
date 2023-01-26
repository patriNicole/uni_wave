import React, { useState } from "react";
import "./SingnUp.css";
import { useNavigate } from "react-router-dom";

import AlertEmailFormat from "../../Alerts/AlertWarningEmailRegistration.js";
import AlertPasswordLength from "../../Alerts/AlertWarningPasswordLength.js";

import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";

export default function LoginPass() {

  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };

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
      <form onSubmit={handleSubmit} className="signup">
        <div class="login__field">
          <FaUser size={30} style={style} />
          <input
            type="text"
            class="login__input"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={data.username}
            required
          />
        </div>
        <div class="login__field">
          <MdEmail size={30} style={style} />
          <input
            type="email"
            class="login__input"
            placeholder="Password"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
          />
        </div>
        <div class="login__field">
          <FaKey size={30} style={style} />
          <input
            type="password"
            class="login__input"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
          />
        </div>
        <div class="login__field">
          <ImFilePicture size={30} style={style} />
          <input
            type="file"
            class="login__input"
            placeholder="Choose file"
            name="file"
            required
          />
        </div>
        
        <button class="button login__submit" type="submit">
					<span class="button__text">Submit</span>
					<IoIosArrowForward class="button__icon fas fa-chevron-right" />
				</button>	
      </form>

      {error && <div>{error}</div>}
      {alertEmail && <AlertEmailFormat />}
      {alertPassword && <AlertPasswordLength />}
    </>
  );
}
