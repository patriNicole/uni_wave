import React, { useState, useEffect } from "react";

import "./RightGroupComponent.css";

import HeaderChat from "./HeaderChat/HeaderChat.js";
import MessageFriend from "./MessageFriend/MessageFriend";
import MessageSend from "./MessageSend/MessageSend.js";
import FriendInfo from "./FriendInfo/FriendInfo";

import { useSelector } from 'react-redux';

export default function RightGroupComponent(props) {

  const [newMessage, setNewMessage] = useState('');

  const inputMessageHendle = (e) => {
    setNewMessage(e.target.value);
  }

  const sendMessage = (e) => {
      e.preventDefault();
      console.log(props.currentfriend, newMessage);
  }

  return (
    <div className="rightGroupChat">

      {/* FIRST PART */}
      <div className="centerPart">
        {/* HEADER PART */}
        <div className="centerHeader">
          <HeaderChat currentfriend={props.currentfriend}/>
        </div>
        <div className="centerChat">
          <MessageFriend newMessage={newMessage} setNewMessage={setNewMessage}/>
          <MessageSend 
            newMessage={newMessage} 
            setNewMessage={setNewMessage} 
            inputMessageHendle={inputMessageHendle} 
            sendMessage={sendMessage}
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
