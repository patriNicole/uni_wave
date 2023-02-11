import React from "react";

import "./ListOfFriends.css";
import "../../GroupComponent.css";

import userPicture from "../../../../../pictures/uniwave.png";

export default function ListOfFriends() {
  return (
    <div className="friend-list">

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

        <div className="friend">
            <div className="friendUserImage">
            <img src={userPicture} alt="userPicture" />
            </div>
            <div className="userName">User Name</div>
        </div>

    </div>
  );
}
