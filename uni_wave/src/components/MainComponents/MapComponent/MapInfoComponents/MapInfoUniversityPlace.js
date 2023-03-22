import React from "react";
import "../MapComponent.css";

import { FiMapPin } from "react-icons/fi";
import UniversityPlace from "../MapInfoPDF/UniversityPlace.pdf";
import uniplace from "../MapInfoPDF/uniplace.jpg";

export default function MapInfoUniversityPlace(props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapTitle">University Place </p>
      <img src={uniplace} alt="uniplace" className="uniplace" />
      <p className="infoMapMoreTitle">------------------------------------</p>
      <a
        href="https://www.google.com/maps/place/The+University+of+Manchester/@53.4656642,-2.2363802,15z/data=!4m5!3m4!1s0x0:0x7cb93350c67efb3c!8m2!3d53.4668498!4d-2.2338837?hl=en-GB"
        target="_blank"
      >
        <FiMapPin size={20} style={style} />
      </a>
      <iframe
        src={UniversityPlace}
        height="93%"
        width="100%"
        className="iframeBuildings"
      ></iframe>
    </>
  );
}
