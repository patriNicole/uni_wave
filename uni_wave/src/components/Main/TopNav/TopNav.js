import React from "react";
import './TopNav.css';
import { FcSearch } from "react-icons/fc";

export default function TopNav() {
  return (
    <>
      <div className="topnav">
          <form>
            <div class="search-box">
              <button class="btn-search"><FcSearch size={40}/></button>
              <input type="text" class="input-search" placeholder="Type to Search..." />
            </div>
          </form>
      </div>
    </>
  );
}
