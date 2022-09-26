import React from "react";
import "./Login.css";

export default function LoginPass() {
  return (
    <>
      <form>
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
