import React from "react";
import "../MapComponent.css";

import { FaUniversity } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function MapInfoLibrary (props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapMoreTitle">Main Library</p>
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
        Information about Main Library
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
          href="https://www.google.com/maps?q=main+library+manchester&um=1&ie=UTF-8&sa=X&ved=2ahUKEwi2iPH95e_9AhV4_rsIHQwXCDYQ_AUoAXoECAMQAw"
          target="_blank"
        >
          <FiMapPin size={20} style={style} />
        </a>
      </p> 
    </>
  );
}
