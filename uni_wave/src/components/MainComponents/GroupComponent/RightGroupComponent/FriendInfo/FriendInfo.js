import React from "react";
import "./FriendInfo.css";

import { FaCaretSquareDown } from "react-icons/fa";

import userPicture from "../../../../../pictures/notfound.jpg";

export default function FriendInfo(props) {
  return (
    <div className="friend-info">
      <input type="checkbox" id="galleryUser" />

      <div className="image-nameFriendInfo">
        <div className="imageFriendInfo">
          <img src={`${props.currentfriend.image}`} alt="userPicture" />
        </div>

        {props.activeUser &&
        props.activeUser.length > 0 &&
        props.activeUser.some(
          (users) => users.userId === props.currentfriend._id
        ) ? (
          <div className="active-user">Active</div>
        ) : (
          ""
        )}

        <div className="nameFriend">{props.currentfriend.username}</div>
      </div>

      <div className="email-display">{props.currentfriend.email}</div>

      <div className="othersFriendInfo">

        <div className="mediaFriend">
          Shared Media
          <label htmlFor="galleryUser">
            <FaCaretSquareDown />
          </label>
        </div>

      </div>

      <div className="galleryUser">
        {props.message && props.message.length > 0
          ? props.message.map(
              (m, index) =>
                m.message.image && (
                  <img key={index} src={`${m.message.image}`} />
                )
            )
          : ""}
      </div>

    </div>
  );
}
