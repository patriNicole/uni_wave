import React from "react";
import "./Login.css";
//import { useNavigate } from "react-router-dom";

import { FaUser, FaKey } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export default function LoginPass() {

  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };

  //const navigate = useNavigate();

  /*function Submit(e){
    e.preventDefault();
    navigate("/home");
  }*/

  return (
    <>
      <form className="login">
        <div className="login__field">
          <FaUser size={30} style={style} />
          <input
            type="text"
            className="login__input"
            placeholder="Username"
            name="username"
            required
          />
        </div>
        <div class="login__field">
          <FaKey size={30} style={style} />
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <button className="button login__submit" type="submit">
					<span className="button__text">Submit</span>
					<IoIosArrowForward className="button__icon fas fa-chevron-right" />
				</button>	
      </form>
    </>
  );
}
