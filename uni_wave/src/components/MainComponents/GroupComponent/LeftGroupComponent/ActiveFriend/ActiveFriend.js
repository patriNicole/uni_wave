import React from "react";

import "./ActiveFriend.css";
import "../../GroupComponent.css";

import userPicture from "../../../../../pictures/uniwave.png";

export default function ActiveFriend({ user, setCurrentFriend, activeUser }) {
  /* In the active list, when clicked on a friend, redirect to that friend in chat. */
  return (
    <div className="active-friend" onClick={()=> setCurrentFriend({
      _id : user.userInfo.id,
      email: user.userInfo.email,
      image : user.userInfo.image,
      userName : user.userInfo.userName
    })}>

      <div className="image-active-icon">

        <div className="activeUserImage">
          <div className="activeUser">
            <img src={`${user.userInfo.image}`} alt="userPicture" />
          </div>
          <div className="active-icon"></div>
        </div>

      </div>

    </div>
  );
}
