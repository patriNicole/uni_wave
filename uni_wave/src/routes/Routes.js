import React from "react";
import LogIn from "../components/Login/LogIn";
import Main from "../components/Main/Main.js";
import MainPlanner from "../components/Main/MainPlanner.js";
import MainMap from "../components/Main/MainMap.js";
import MainGroups from "../components/Main/MainGroups.js";
import MainTeaching from "../components/Main/MainTeaching.js";
import MainInfo from "../components/Main/MainInfo.js";
import MainSettings from "../components/Main/MainSettings.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Main />} /> 
        <Route path="/planner" element={<MainPlanner />} />
        <Route path="/map" element={<MainMap />} />
        <Route path="/groups" element={<MainGroups />} />
        <Route path="/teaching" element={<MainTeaching />} />
        <Route path="/info" element={<MainInfo />} />  
        <Route path="/settings" element={<MainSettings />} />
      </Routes>
    </Router>
  );
}
