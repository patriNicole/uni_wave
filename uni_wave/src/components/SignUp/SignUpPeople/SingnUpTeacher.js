import React from "react";
import './SingnUp.css';
import { useNavigate } from "react-router-dom";

import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";

export default function LoginTeacher() {

  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };
  
  const navigate = useNavigate();

  function Submit(e){
    e.preventDefault();
    navigate("/home");
  }
  return (
    <>
      <form className="signup">
        <div class="login__field">
          <FaUser size={30} style={style} />
          <input
            type="text"
            class="login__input"
            placeholder="Username"
            name="username"
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
    </>
  );
}
