import React, { useState } from "react";
import HomePage from "../components/HomePage/HomePage.js";
import NotFound from "../components/HomePage/NotFound.js";
import LogIn from "../components/Login/LogIn.js";
import SignUp from "../components/SignUp/SingnUp.js";
import Main from "../components/Main/Main.js";
import MainPlanner from "../components/Main/MainPlanner.js";
import MainMap from "../components/Main/MainMap.js";
import MainGroups from "../components/Main/MainGroups.js";
import MainTeaching from "../components/Main/MainTeaching.js";
import MainInfo from "../components/Main/MainInfo.js";
import MainSettings from "../components/Main/MainSettings.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Protect Route if user not logged in
import ProtectRoute from "./ProtectRoute.js";

export default function PageRoutes() {

  /* Change Backgroung Color of the Page */
  const [pageColor, setPageColor] = useState(false);

  return (
    
      <Routes>
        <Route exact path="/" element={<HomePage pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/" element={<LogIn pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/" element={<SignUp pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/home" element={<ProtectRoute><Main pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} /> 
        <Route path="/planner" element={<ProtectRoute><MainPlanner pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} />
        <Route path="/groups" element={<ProtectRoute><MainGroups pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} />
        <Route path="/teaching" element={<ProtectRoute><MainTeaching pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} />
        <Route path="/info" element={<ProtectRoute><MainInfo pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} />  
        <Route path="/settings" element={<ProtectRoute><MainSettings pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} />
        <Route path="/map" element={<ProtectRoute><MainMap pageColor={pageColor} setPageColor={setPageColor}/></ProtectRoute>} />
        <Route path="/*" element={<NotFound pageColor={pageColor} setPageColor={setPageColor}/>} />
      </Routes>
    
  );
}
