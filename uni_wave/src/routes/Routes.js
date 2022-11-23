import React, { useState } from "react";
import LogIn from "../components/Login/LogIn";
import Main from "../components/Main/Main.js";
import MainPlanner from "../components/Main/MainPlanner.js";
import MainMap from "../components/Main/MainMap.js";
import MainGroups from "../components/Main/MainGroups.js";
import MainTeaching from "../components/Main/MainTeaching.js";
import MainInfo from "../components/Main/MainInfo.js";
import MainSettings from "../components/Main/MainSettings.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function PageRoutes() {

  {/* Change Backgroung Color of the Page */}
  const [pageColor, setPageColor] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/home" element={<Main pageColor={pageColor} setPageColor={setPageColor}/>} /> 
        <Route path="/planner" element={<MainPlanner pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/groups" element={<MainGroups pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/teaching" element={<MainTeaching pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/info" element={<MainInfo pageColor={pageColor} setPageColor={setPageColor}/>} />  
        <Route path="/settings" element={<MainSettings pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/map" element={<MainMap pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/*" element={<LogIn pageColor={pageColor} setPageColor={setPageColor}/>} />
      </Routes>
    </Router>
  );
}
