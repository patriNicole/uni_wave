import "./HomePage.css";
import React from "react";
import "../../App.css";

import notfound from "../../pictures/notfound.jpg";

export default function NotFound(props) {

  return (
    <>
        <img src={notfound} alt="notfound" className="notfoundPicture" />
    </>
  );
}