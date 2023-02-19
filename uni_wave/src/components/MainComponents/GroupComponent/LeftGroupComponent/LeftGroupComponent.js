import React, { useEffect } from "react";

import "./LeftGroupComponent.css";

import { FcSearch } from "react-icons/fc";

import ActiveFriends from "./ActiveFriend/ActiveFriend.js";
import MessageFriends from "./ListOfFriends/ListOfFriends.js";

import { useSelector } from 'react-redux';

export default function LeftGroupComponent(props) {

  //used user info as appears (Redux) when logged in in application
  const {userInfo} = useSelector( state => state.auth );

  return (
    <>
      <div className="leftGroupChat">
        <div className="leftGroupChatContainer">
          <div className="userHeader" key={userInfo._id}>
            <div className="userImage">
              <img src={`${userInfo.image}`} alt="userPicture" />
            </div>

            <div className="userName">{userInfo.username}</div>
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

          <MessageFriends currentfriend={props.currentfriend} setCurrentFriend={props.setCurrentFriend}/>
        </div>
      </div>
    </>
  );
}
