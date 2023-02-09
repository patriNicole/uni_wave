import React from "react";

import "./GroupComponent.css";
import "../../Main/TopNav/TopNav.css";

import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

import userPicture from "../../../pictures/uniwave.png";

export default function GroupComponent() {
  return (
    <div className="groupComponent">
      {/* LEFT SIDE OF THE CHAT */}
      <div className="leftGroupChat">
        <div class="leftGroupChatContainer">
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
        </div>
      </div>

      {/* RIGHT SIDE OF THE CHAT */}
      <div class="rightGroupChat">
        <p>Right</p>
      </div>
    </div>
  );
}
