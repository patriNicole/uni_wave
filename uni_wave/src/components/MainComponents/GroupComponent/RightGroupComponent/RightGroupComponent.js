import React from "react";

import "./RightGroupComponent.css";

export default function RightGroupComponent() {
  return (
    <div className="rightGroupChat">

      {/* FIRST PART */}
      <div className="centerPart">
        {/* HEADER PART */}
        <div className="centerHeader">
          header
        </div>
        <div className="centerChat">
          center
        </div>
      </div>

      {/* SECOND HIDDEN PART */}
      <div className="hiddenCenter">
        <div className="hiddenCenterContent">
          infoUser
        </div>
      </div>

    </div>
  );
}
