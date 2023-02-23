import React, { useState, useEffect } from "react";
import "./SingnUp.css";

import { useNavigate } from 'react-router-dom';

import AlertEmailFormat from "../../Alerts/AlertWarningEmailRegistration.js";
import AlertWarningRegister from "../../Alerts/AlertWarningRegister.js";
import AlertSuccessRegister from "../../Alerts/AlertSuccessRegister.js";

import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

//dispach actions to the store, by adding actions as argument
//to the new variable
import { useDispatch, useSelector } from "react-redux";
import signupAction from '../../../store/actions/signupAction.js';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../../../store/types/authType.js';

export default function SignUpPass() {

  //dispach the action from the store
  //working with reducer
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

  const [alertEmail, setAlertEmail] = useState(false);
  const [alertWarningRegister, setAlertWarningRegister] = useState(false);
  const [alertSuccessRegister, setAlertSuccessRegister] = useState(false);

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

    //if the email is in the right format
    if (data.email.includes("@student.manchester.ac.uk")) {
      setAlertEmail(false);
      dispatch(signupAction(formData)); 
    } else {
      setAlertEmail(true);
    }
   
  };

  const navigate = useNavigate();
  
  useEffect(()=>{
    if(authenticate){
      setAlertSuccessRegister(true);
      navigate('/');
      window.location.reload(false);
      //setAlertSuccessRegister(false);
    }
    if(successMessage){
      setAlertSuccessRegister(true);
      setAlertWarningRegister(false);
      //dispatch({type : SUCCESS_MESSAGE_CLEAR })
    }
    if(error){
      setAlertSuccessRegister(false);
      setAlertWarningRegister(true);
      //dispatch({type : ERROR_CLEAR })
    }

  },[successMessage, error]);

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

      {alertEmail && <AlertEmailFormat />}
      {alertWarningRegister && <AlertWarningRegister />}
      {alertSuccessRegister && <AlertSuccessRegister/>}
    </>
  );
}
