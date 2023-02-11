import React from "react";

import "./RightGroupComponent.css";

import HeaderChat from "./HeaderChat/HeaderChat.js";
import MessageFriend from "./MessageFriend/MessageFriend";

export default function RightGroupComponent() {
  return (
    <div className="rightGroupChat">

      {/* FIRST PART */}
      <div className="centerPart">
        {/* HEADER PART */}
        <div className="centerHeader">
          <HeaderChat/>
        </div>
        <div className="centerChat">
          <MessageFriend/>
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
