import React, { useState, useEffect } from "react";
import "./Login.css";

import { useNavigate } from "react-router-dom";

import AlertWarningRegister from "../../Alerts/AlertWarningRegister.js";
import AlertSuccessRegister from "../../Alerts/AlertSuccessRegister.js";

import { FaUser, FaKey } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import {useDispatch,useSelector} from "react-redux";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../../../store/types/authType.js';
import loginAction from '../../../store/actions/loginAction.js';

export default function LoginPass() {
  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  //Alerts
  const [alertWarningRegister, setAlertWarningRegister] = useState(false);
  const [alertSuccessRegister, setAlertSuccessRegister] = useState(false);

  //data
  const { loading, authenticate, error, successMessage, userInfo } = useSelector(state => state.auth);

  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const inputUser = (input) => {
    setUserData({
      ...userData,
      //name from below input name = username, password
      [input.target.name]: input.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    //console.log(userData);
    dispatch(loginAction(userData)); 
  };

  useEffect(()=>{
    if(authenticate){
      setAlertSuccessRegister(true);
      //navigate('/home');
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
      <form className="login" onSubmit={loginUser}>
        <div className="login__field">
          <FaUser size={30} style={style} />
          <input
            type="text"
            className="login__input"
            placeholder="Username"
            name="username"
            onChange={inputUser} 
            value={userData.username}
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
            onChange={inputUser} 
            value={userData.password}
            //required
          />
        </div>
        <button className="button login__submit" type="submit">
          <span className="button__text">Submit</span>
          <IoIosArrowForward className="button__icon fas fa-chevron-right" />
        </button>
      </form>

      {alertWarningRegister && <AlertWarningRegister />}
      {alertSuccessRegister && <AlertSuccessRegister/>}
    </>
  );
}
