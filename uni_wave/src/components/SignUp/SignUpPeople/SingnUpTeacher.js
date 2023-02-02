import React from "react";
import './SingnUp.css';
import { useNavigate } from "react-router-dom";

import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

export default function SignUpTeacher() {

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
        <div className="login__field">
          <MdEmail size={30} style={style} />
          <input
            type="email"
            className="login__input"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div className="login__field">
          <FaKey size={30} style={style} />
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div className="login__field">
          <div className="file-image">
            <div className="image"></div>
            <div className="file">
            <label className="upload-label">
              <input
                type="file"
                className="login__input"
                placeholder="Choose file"
                name="file"
              />Select Image
            </label>
            </div>
          </div>
        </div>

        <button className="button login__submit" type="submit">
					<span className="button__text">Submit</span>
					<IoIosArrowForward className="button__icon fas fa-chevron-right" />
				</button>	
      </form>
    </>
  );
}
