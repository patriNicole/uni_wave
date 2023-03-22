import React from "react";
import "../MapComponent.css";

import { FaUniversity } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import alig from "../MapInfoPDF/alig.jpg";
import alig1 from "../MapInfoPDF/alig1.jpg";

export default function MapInfoAliG (props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapMoreTitle">Alan Gilbert Learning Commons</p>
      <div className="picturesBuilding">
        <img
          src={alig}
          alt="alig"
          className="aligPicture"
        />
        <img
          src={alig1}
          alt="alig"
          className="aligPicture"
        />
      </div>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Book Study Place
        <a
          className="mapInteractiveLink"
          href="https://resourcebooker.manchester.ac.uk/app/booking-types/c03939fe-7180-4d5a-bb00-f57f19ad8ded"
          target="_blank"
        >
          <FaUniversity size={20} style={style} />
        </a>
      </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Information about Learning Commons
        <a
          className="mapInteractiveLink"
          href="https://www.manchester.ac.uk/study/virtual/360-tours/library-study-spaces/"
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
          href="https://www.google.com/maps/place/Alan+Gilbert+Learning+Commons/@53.464796,-2.233305,15z/data=!4m12!1m6!3m5!1s0x0:0xd25e01e6aefd637d!2sAlan+Gilbert+Learning+Commons!8m2!3d53.464796!4d-2.2333049!3m4!1s0x0:0xd25e01e6aefd637d!8m2!3d53.464796!4d-2.2333049?hl=en"
          target="_blank"
        >
          <FiMapPin size={20} style={style} />
        </a>
      </p> 
    </>
  );
}
