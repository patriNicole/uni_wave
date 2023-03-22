import React from "react";
import "../MapComponent.css";

import { FiMapPin } from "react-icons/fi"; 
import uni from "../MapInfoPDF/uni.jpg";
import { FaGraduationCap } from "react-icons/fa";

export default function MapInfoMainBuilding(props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapMoreTitle">
        The University of Manchester Main Building{" "}
      </p>
      <img src={uni} alt="uniplace" className="uniplace" />
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Location on Map
        <a
          className="mapInteractiveLink"
          href="https://www.google.com/maps?q=the+university+of+manchester+main+building&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjolZHf4-_9AhWLYcAKHQvZA0kQ_AUoAXoECAEQAw"
          target="_blank"
        >
          <FaGraduationCap size={20} style={style} />
      </a>
      </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Graduation Ceremony
        <a
          className="mapInteractiveLink"
          href="http://www.graduation.manchester.ac.uk/"
          target="_blank"
        >
          <FaGraduationCap size={20} style={style} />
        </a>
      </p>
    </>
  );
}
