import React from "react";
import "./TopNav.css";
import { FcSearch } from "react-icons/fc";

import { Toaster } from "react-hot-toast";

export default function TopNav() {
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
