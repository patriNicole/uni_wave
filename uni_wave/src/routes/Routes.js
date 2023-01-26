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

export default function PageRoutes() {

  {/* Change Backgroung Color of the Page */}
  const [pageColor, setPageColor] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/login" element={<LogIn pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/signup" element={<SignUp pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/home" element={<Main pageColor={pageColor} setPageColor={setPageColor}/>} /> 
        <Route path="/planner" element={<MainPlanner pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/groups" element={<MainGroups pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/teaching" element={<MainTeaching pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/info" element={<MainInfo pageColor={pageColor} setPageColor={setPageColor}/>} />  
        <Route path="/settings" element={<MainSettings pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/map" element={<MainMap pageColor={pageColor} setPageColor={setPageColor}/>} />
        <Route path="/*" element={<NotFound pageColor={pageColor} setPageColor={setPageColor}/>} />
      </Routes>
    </Router>
  );
}
