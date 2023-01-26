import React from "react";
import './SingnUp.css';
import { useNavigate } from "react-router-dom";

export default function LoginTeacher() {
  
  const navigate = useNavigate();

  function Submit(e){
    e.preventDefault();
    navigate("/home");
  }
  return (
    <>
      <form  onSubmit={Submit}>
        <label className="username">
          username:
          <input className="input-form" type="text" />
        </label>
        <label className="email">
          email:
          <input className="input-form" type="text" />
        </label>
        <label className="password">
          password:
          <input className="input-form" type="password" />
        </label>
        <button className="button-submit" type="submit">Submit</button>
      </form>
    </>
  );
}
