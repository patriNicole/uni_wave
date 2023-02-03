import React, { useState } from "react";
import "./SingnUp.css";

import AlertEmailFormat from "../../Alerts/AlertWarningEmailRegistration.js";
import AlertPasswordLength from "../../Alerts/AlertWarningPasswordLength.js";

import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

//dispach actions to the store, by adding actions as argument
//to the new variable
import { useDispatch, useSelector } from "react-redux";
import signupAction from '../../../store/actions/signupAction.js';

export default function SignUpPass() {

  //dispach the action from the store
  const dispatch = useDispatch();

  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  //const [error, setError] = useState("");

  const [alertEmail, setAlertEmail] = useState(false);
  const [alertPassword, setAlertPassword] = useState(false);

  const { loading, authenticate, error, successMessage, userInfo } = useSelector(state => state.auth);

  //redirect to home page
  //const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    //each input has a name
    setData({ ...data, [input.name]: input.value });
  };

  const fileHandle = ({ currentTarget: input }) => {
    if (input.files.length !== 0) {
      setData({
        ...data,
        [input.name]: input.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(input.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    const formData = new FormData();

    //append as key-value
    //key is all the input data (name) 
    //save it into out state, which is the value
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image);

    dispatch(signupAction(formData));

    //console.log(username, email, password);
    /*try {
      //if the email is in the right format
      if (data.email.includes("@student.manchester.ac.uk")) {
        setAlertEmail(false);

        if (data.password.length < 8) {
          setAlertPassword(true);
        } else {
          setAlertPassword(false);
          // fetch data from API 
          // REGISTRATION 
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
    }*/
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signup">
        <div className="login__field">
          <FaUser size={30} style={style} />
          <input
            type="text"
            className="login__input"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={data.username}
            //required
          />
        </div>
        <div className="login__field">
          <MdEmail size={30} style={style} />
          <input
            type="email"
            className="login__input"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            //required
          />
        </div>
        <div className="login__field">
          <FaKey size={30} style={style} />
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            //required
          />
        </div>
        <div className="login__field">
          <div className="file-image">
            <div className="image">
              {loadImage ? (
                <img alt={loadImage} src={loadImage} style={{ objectFit: "cover" }} />
              ) : (
                ""
              )}
            </div>
            <div className="file">
              <label className="upload-label">
                <input
                  type="file"
                  className="login__input"
                  placeholder="Choose file"
                  name="image"
                  onChange={fileHandle}
                />
                Select Image
              </label>
            </div>
          </div>
        </div>

        <button className="button login__submit" type="submit">
          <span className="button__text">Submit</span>
          <IoIosArrowForward className="button__icon fas fa-chevron-right" />
        </button>
      </form>

      {/*error && <div>{error}</div>*/}
      {alertEmail && <AlertEmailFormat />}
      {alertPassword && <AlertPasswordLength />}
    </>
  );
}
