import React, { useEffect } from "react";

import "./LeftGroupComponent.css";

import { FcSearch } from "react-icons/fc";

import ActiveFriends from "./ActiveFriend/ActiveFriend.js";
import MessageFriends from "./ListOfFriends/ListOfFriends.js";

export default function LeftGroupComponent({
  userInfo,
  currentfriend,
  setCurrentFriend,
  activeUser,
}) {
  return (
    <>
      <div className="leftGroupChat" key={userInfo._id}>
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
          {activeUser && activeUser.length > 0
            ? activeUser.map((users) => (
                <ActiveFriends
                  key={users.userInfo.id}
                  user={users}
                  setCurrentFriend={setCurrentFriend}
                />
              ))
            : ""}

          <MessageFriends
            userInfo={userInfo}
            currentfriend={currentfriend}
            setCurrentFriend={setCurrentFriend}
          />
        </div>
      </div>
    </>
  );
}
