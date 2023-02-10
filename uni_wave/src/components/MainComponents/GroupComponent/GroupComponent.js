import React from "react";

import "./GroupComponent.css";
import "../../Main/TopNav/TopNav.css";

import LeftGroupComponent from "./LeftGroupComponent/LeftGroupComponent.js";
import RightGroupComponent from "./RightGroupComponent/RightGroupComponent.js";

export default function GroupComponent() {
  return (
    <div className="groupComponent">
      {/* LEFT SIDE OF THE CHAT */}
      <LeftGroupComponent/>

      {/* RIGHT SIDE OF THE CHAT */}
      <div class="rightGroupChat">
        <RightGroupComponent/>
      </div>
    </div>
  );
}
