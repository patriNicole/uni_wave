import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { BiCog } from "react-icons/bi";

import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiUsers,
  FiMonitor,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

import { HiLightBulb } from "react-icons/hi";

import "react-pro-sidebar/dist/css/styles.css";
import "./SideNav.css";

import uniwave from "../../../pictures/uniwave.png";

export default function SideBar() {
    
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="menu">
        <img src={uniwave} alt="logo" id="uniwaveLogo" />
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle  size={40}/>
              ) : (
                <>
                  <h3>Menu</h3> <FiArrowLeftCircle size={40}/>
                </>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FiHome size={20}/>}>
                Home
                <Link exact to="/home" />
              </MenuItem>
              <MenuItem icon={<FiCalendar size={20}/>}>
                Planner
                <Link to="/planner" />
              </MenuItem>
              <MenuItem icon={<FiMapPin size={20}/>}>
                Campus Map
                <Link to="/map" />
              </MenuItem>
              <MenuItem icon={<FiUsers size={20}/>}>
                Groups
                <Link to="/groups" />
              </MenuItem>
              <MenuItem icon={<FiMonitor size={20}/>}>
                Teaching
                <Link to="/teaching" />
              </MenuItem>
              <MenuItem icon={<HiLightBulb size={20}/>}>
                Info
                <Link to="/info" />
              </MenuItem>
              <MenuItem icon={<BiCog size={20}/>}>
                Settings
                <Link to="/settings" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut size={20}/>}>
                LogOut
                <Link exact to="/" />
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};
