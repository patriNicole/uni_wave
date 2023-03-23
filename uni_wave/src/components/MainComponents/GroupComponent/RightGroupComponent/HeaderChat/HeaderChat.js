import React from "react";
import "./HeaderChat.css";

import { FaVideo, FaRocketchat } from "react-icons/fa";

export default function HeaderChat(props) {
  return (
    <>
      <div className="message-send-show">
        <div className="headerChatMessage">
          <div className="image-name-chat-header">
            <div className="imageFriendChatMessage">
              <div className="activeUser">
                <img src={`${props.currentfriend.image}`} alt="userPicture" />
              </div>
              {props.activeUser &&
              props.activeUser.length > 0 &&
              props.activeUser.some(
                (users) => users.userId === props.currentfriend._id
              ) ? (
                <div className="active-icon"></div>
              ) : (
                ""
              )}
            </div>
            <div className="nameFriendChat">{props.currentfriend.username}</div>
          </div>

          <div className="iconsUserChat">
            <div
              className="iconUserChat"
              onClick={() => {
                window.open(
                  "http://localhost:9000/",
                  "Second Application",
                  "width=800,height=600"
                );
              }}
            >
              <FaVideo />
            </div>

            <div
              className="iconUserChat"
              onClick={() => {
                props.setShowUserInfo(!props.showUserInfo);
              }}
            >
              <FaRocketchat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
