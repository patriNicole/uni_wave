import React from "react";
import "../MapComponent.css";

import Engineering from "../MapInfoPDF/UniversityPlace.pdf";

import { FaUniversity } from "react-icons/fa";

export default function MapInfoEngineering(props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapMoreTitle">Engineering Building </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Book Study Place in Engineering
        <a
          className="mapInteractiveLink"
          href="https://resourcebooker.manchester.ac.uk/app/booking-types/a0ad7d46-d2f6-428d-aeba-04a0acc03503"
          target="_blank"
        >
          <FaUniversity size={20} style={style} />
        </a>
      </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        Information about Engineering Building
        <a
          className="mapInteractiveLink"
          href="https://www.mecd.manchester.ac.uk/"
          target="_blank"
        >
          <FaUniversity size={20} style={style} />
        </a>
      </p>
      <iframe
        src="https://clients.mapsindoors.com/uniofmanchester/f02513f6650e4646ae55c607/search"
        height="93%"
        width="90%"
        className="iframeBuildings"
      ></iframe>
      <iframe
        src={Engineering}
        height="93%"
        width="90%"
        className="iframeBuildings"
      ></iframe>
    </>
  );
}
