import React from "react";
import "../MapComponent.css";

import { FaUniversity } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function MapInfoStudentUnion(props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapTitle">Student Union</p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Information about Student Union
        <a
          className="mapInteractiveLink"
          href="https://manchesterstudentsunion.com/"
          target="_blank"
        >
          <FaUniversity size={20} style={style} />
        </a>
      </p> 
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Events
        <a
          className="mapInteractiveLink"
          href="https://manchesterstudentsunion.com/events"
          target="_blank"
        >
          <FaUniversity size={20} style={style} />
        </a>
      </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        See location on Map
        <a
          className="mapInteractiveLink"
          href="https://www.google.com/maps/place/University+of+Manchester+Students'+Union/@53.464375,-2.2343547,17z/data=!4m12!1m6!3m5!1s0x487bb18db7632207:0x447a3d49fbf7ed74!2sUniversity+of+Manchester+Students'+Union!8m2!3d53.464375!4d-2.232166!3m4!1s0x487bb18db7632207:0x447a3d49fbf7ed74!8m2!3d53.464375!4d-2.232166"
          target="_blank"
        >
          <FiMapPin size={20} style={style} />
        </a>
      </p> 
    </>
  );
}
