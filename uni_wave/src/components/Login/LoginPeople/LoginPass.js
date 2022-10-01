import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function LoginPass() {

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
          <input type="text" />
        </label>
        <label className="password">
          password:
          <input type="password" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
