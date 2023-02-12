import React from "react";
import "./FriendInfo.css";

import { FaCaretSquareDown } from "react-icons/fa";

import userPicture from "../../../../../pictures/notfound.jpg";

export default function FriendInfo() {
  return (
    <div className="friend-info">
      <input type="checkbox" id="galleryUser" />

      <div className="image-nameFriendInfo">

        <div className="imageFriendInfo">
          <img src={userPicture} alt="userPicture"/>
        </div>

        <div className="active-user">Active</div>

        <div className="nameFriend">
          User Info
        </div>

      </div>

      <div className="othersFriendInfo">
        <div className="custom-chat">
          Coustomise Chat
          <FaCaretSquareDown />
        </div>

        <div className="privacy">
          Privacy and Support
          <FaCaretSquareDown />
        </div>

        <div className="mediaFriend">
          Shared Media
          <label htmlFor="galleryUser">
            <FaCaretSquareDown />
          </label>
        </div>
      </div>

      <div className="galleryUser">
        <img src={userPicture} alt="userPicture"/>
        <img src={userPicture} alt="userPicture"/>
        <img src={userPicture} alt="userPicture"/>
        <img src={userPicture} alt="userPicture"/>
      </div>
    </div>
  );
}
