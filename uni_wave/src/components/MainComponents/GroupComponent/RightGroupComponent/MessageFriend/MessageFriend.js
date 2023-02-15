import React,{ useEffect } from "react";
import "./MessageFriend.css";

import userPicture from "../../../../../pictures/notfound.jpg";

export default function MessageFriend() {

  return (
    <div className="messageCenter">

      {/* USER WHO IS LOGGED IN */}
      <div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> How Are You? hhhhhhhhaWDHwkdhxskwHDXHASDHJXShdxhashdxashdxahxjhsajx </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

      <div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> <img src={userPicture} alt="userPicture"/> </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

      {/* USER'S FRIEND */}
      <div className="friend-message">
        <div className="friend-image-and-message">

          <div className="friend-message-image">
            <img src={userPicture} alt="userPicture"/>
          </div>

          <div className="friend-message-time">
            <div className="friend-message-text">
              <p className="message-text">I am Fine xvaxvavxvagxvagxagxvagxagxfaxgaxgaxfa </p>
            </div>
          </div>
        </div>
        <div className="time">3 Jan 2022</div>
      </div>

       {/* USER WHO IS LOGGED IN */}
      <div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> How Are You? </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

      {/* USER WHO IS LOGGED IN */}
      <div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> How Are You? </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

{/* USER WHO IS LOGGED IN */}
<div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> How Are You? hhhhhhhhaWDHwkdhxskwHDXHASDHJXShdxhashdxashdxahxjhsajx </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

      {/* USER'S FRIEND */}
      <div className="friend-message">
        <div className="friend-image-and-message">

          <div className="friend-message-image">
            <img src={userPicture} alt="userPicture"/>
          </div>

          <div className="friend-message-time">
            <div className="friend-message-text">
              <p className="message-text">I am Fine xvaxvavxvagxvagxagxvagxagxfaxgaxgaxfa </p>
            </div>
          </div>
        </div>
        <div className="time">3 Jan 2022</div>
      </div>

       {/* USER WHO IS LOGGED IN */}
      <div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> How Are You? </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

      {/* USER WHO IS LOGGED IN */}
      <div className="my-message">
        <div className="my-image-and-message">
          <div className="my-message-text">
            <p className="message-text"> How Are You? </p>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>

    </div>
  );
}
