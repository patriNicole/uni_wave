import React from "react";

import "./LeftGroupComponent.css";

import { FcSearch } from "react-icons/fc";

import userPicture from "../../../../pictures/uniwave.png";

import ActiveFriends from "./ActiveFriend/ActiveFriend.js";
import MessageFriends from "./ListOfFriends/ListOfFriends.js";

export default function LeftGroupComponent() {
    return (
      <>
        <div className="leftGroupChat">
          <div className="leftGroupChatContainer">
            <div className="userHeader">
              <div className="userImage">
                <img src={userPicture} alt="userPicture" />
              </div>
  
              <div className="userName">User Name</div>
            </div>
  
            <div className="searchUser">
              <form className="form">
                <div className="search-box-top">
                  <button className="btn-search-top"></button>
                  <FcSearch size={40} />
                  <input
                    type="text"
                    className="input-search-top"
                    placeholder="  Search..."
                  />
                </div>
              </form>
            </div>
  
            {/* USERS */}
            <ActiveFriends />
  
            <MessageFriends />
          </div>
        </div>
      </>
    );
  }
  