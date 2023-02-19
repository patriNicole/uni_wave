import React, { useState, useEffect } from "react";

import "./RightGroupComponent.css";

import HeaderChat from "./HeaderChat/HeaderChat.js";
import MessageFriend from "./MessageFriend/MessageFriend";
import MessageSend from "./MessageSend/MessageSend.js";
import FriendInfo from "./FriendInfo/FriendInfo";

export default function RightGroupComponent(props) {

  return (
    <div className="rightGroupChat">

      {/* FIRST PART */}
      <div className="centerPart">
        {/* HEADER PART */}
        <div className="centerHeader">
          <HeaderChat currentfriend={props.currentfriend}/>
        </div>
        <div className="centerChat">
          <MessageFriend 
            message = { props.message}
            currentfriend = { props.currentfriend }
          />
          <MessageSend 
            newMessage={props.newMessage} 
            setNewMessage={props.setNewMessage} 
            inputMessageHendle={props.inputMessageHendle} 
            sendMessage={props.sendMessage}
          />
        </div>
      </div>

      {/* SECOND HIDDEN PART */}
      <div className="hiddenCenter">
        <div className="hiddenCenterContent">
          <FriendInfo currentfriend={props.currentfriend}/>
        </div>
      </div>

    </div>
  );
}
