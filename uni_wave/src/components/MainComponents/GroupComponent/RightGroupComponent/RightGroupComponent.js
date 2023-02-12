import React from "react";

import "./RightGroupComponent.css";

import HeaderChat from "./HeaderChat/HeaderChat.js";
import MessageFriend from "./MessageFriend/MessageFriend";
import MessageSend from "./MessageSend/MessageSend.js";
import FriendInfo from "./FriendInfo/FriendInfo";

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
          <MessageSend/>
        </div>
      </div>

      {/* SECOND HIDDEN PART */}
      <div className="hiddenCenter">
        <div className="hiddenCenterContent">
          <FriendInfo/>
        </div>
      </div>

    </div>
  );
}
