import React from "react";
import "./HeaderChat.css";

import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";

import userPicture from "../../../../../pictures/uniwave.png";

export default function HeaderChat() {
  return (
    <>
      <div className="message-send-show">
        <div className="headerChatMessage">
          <div className="image-name-chat-header">
            <div className="imageFriendChatMessage">
              <img src={userPicture} alt="userPicture" />
            </div>
            <div className="nameFriendChat">User friend</div>
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
