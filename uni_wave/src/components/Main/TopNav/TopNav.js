import React from "react";
import "./TopNav.css";
//import { FcSearch } from "react-icons/fc";

import { useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";

export default function TopNav() {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="topnav-top">
        <Toaster
          position={"top-right"}
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "18px",
            },
          }}
        />
        <div className="userHeaderTop" key={userInfo._id}>
          <div className="userInfoTop">
            <div className="userNameTop">{userInfo.username}</div>
            <div className="userEmailTop">{userInfo.email}</div>
          </div>
          <div className="userImageTop">
            <img src={`${userInfo.image}`} alt="userPicture" />
          </div>
        </div>
        {/*
          <form className="form">
            <div className="search-box-top">
            <button className="btn-search-top"></button><FcSearch size={40}/>
              <input type="text" className="input-search-top" placeholder="  Search..." />
            </div>/
          </form>
        */}
      </div>
    </>
  );
}
