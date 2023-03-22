import React from "react";
import "../MapComponent.css";

import { MdOutlineSportsHandball } from "react-icons/md";

export default function MapInfoSports(props) {
  const style = { color: "white", fontSize: "1.5em" };

  return (
    <>
      <p className="infoMapTitle">Sport </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        University Sport Clubs
        <a
          className="mapInteractiveLink"
          href="https://manchesterstudentsunion.com/activities?cat=Sport"
          target="_blank"
        >
          <MdOutlineSportsHandball size={20} style={style} />
        </a>
      </p>
      <p className="infoMapMoreTitle">------------------------------------</p>
      <p className="infoMapMoreTitle">
        BETTER UK visit website
        <a
          className="mapInteractiveLink"
          href="https://www.better.org.uk/monthly-membership/better-hf-student"
          target="_blank"
        >
          <MdOutlineSportsHandball size={20} style={style} />
        </a>
      </p>
      <iframe
        src="https://www.better.org.uk/monthly-membership/better-hf-student"
        height="93%"
        width="90%"
        className="iframeBuildings"
      ></iframe>
    </>
  );
}
