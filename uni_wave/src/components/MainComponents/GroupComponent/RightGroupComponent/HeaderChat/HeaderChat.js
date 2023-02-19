import React from "react";
import "./HeaderChat.css";

import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";

export default function HeaderChat(props) {
  return (
    <>
      <div className="message-send-show">
        <div className="headerChatMessage">
          <div className="image-name-chat-header">
            <div className="imageFriendChatMessage">
              <img src={`${props.currentfriend.image}`} alt="userPicture" />
            </div>
            <div className="nameFriendChat">{props.currentfriend.username}</div>
          </div>

          <div className="iconsUserChat">
            <div className="iconUserChat">
              <FaPhoneAlt />
            </div>

            <div className="iconUserChat">
              <FaVideo />
            </div>

            <div className="iconUserChat">
              <FaRocketchat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
