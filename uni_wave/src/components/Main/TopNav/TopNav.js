import React from "react";
import './TopNav.css';
import { FcSearch } from "react-icons/fc";

export default function TopNav() {
  return (
    <>
      <div className="topnav-top">
          <form className="form">
            <div className="search-box-top">
            <button className="btn-search-top"></button><FcSearch size={40}/>
              <input type="text" className="input-search-top" placeholder="  Search..." />
            </div>
          </form>
      </div>
    </>
  );
}
