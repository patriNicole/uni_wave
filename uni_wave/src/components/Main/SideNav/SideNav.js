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

import { BiCog, BiSun, BiMoon } from "react-icons/bi";

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

import uniwave from "../../../pictures/logo-color.png";
import logo from "../../../pictures/uniwave.png";

import {useDispatch } from 'react-redux';
//import {userLogout } from '../../../store/actions/logoutAction.js';

export default function SideBar(props) {
  const [menuCollapse, setMenuCollapse] = useState(true);

  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();
  
  const logoutUser = () => {
    //dispatch(userLogout());
  }

  return (
    <>
      {/* Change Backgroung Color of the Page */}
      {props.pageColor ? (
        <style>
          {
            ".page_background { background: rgb(20, 0, 37) !important; } .input-search { color: white; } #menu .closemenu h3 { color: #e1c3ffc6; } #menu .pro-sidebar-inner .pro-sidebar-layout ul .pro-inner-item { color: #e1c3ffc6; }"
          }
        </style>
      ) : (
        <>
          <style>{" .page_background {background-image: linear-gradient(to bottom, #5d54a4, #736bb4, #8a83c4, #a19bd3, #b8b4e3) !important;}"}</style>
        </>
      )}

      <div id="menu">
        {props.pageColor ? (
          <img src={logo} alt="logo" id="uniwaveLogo" /> 
        ) : (
          <img src={uniwave} alt="logo" id="uniwaveLogo" /> 
        )}

        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle size={40} />
              ) : (
                <>
                  <h3>Menu</h3> <FiArrowLeftCircle size={40} />
                </>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem icon={<FiHome size={20} />}>
                Home
                <Link exact="true" to="/home" />
              </MenuItem>
              <MenuItem icon={<FiCalendar size={20} />}>
                Planner
                <Link to="/planner" />
              </MenuItem>
              <MenuItem icon={<FiMapPin size={20} />}>
                Campus Map
                <Link to="/map" />
              </MenuItem>
              <MenuItem icon={<FiUsers size={20} />}>
                Groups
                <Link to="/groups" />
              </MenuItem>
              <MenuItem icon={<FiMonitor size={20} />}>
                Teaching
                <Link to="/teaching" />
              </MenuItem>
              <MenuItem icon={<HiLightBulb size={20} />}>
                Info
                <Link to="/info" />
              </MenuItem>
              <MenuItem icon={<BiCog size={20} />}>
                Settings
                <Link to="/settings" />
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">

              {/* SIGN OUT */}
              <MenuItem icon={<FiLogOut size={20} />} onClick={logoutUser}>
                LogOut
                {/*<Link exact="true" to="/" />*/}
              </MenuItem>
              {/* SIGN OUT */}

              <MenuItem>
                <button
                  className="bgMainPageColor"
                  checked={props.pageColor}
                  onClick={() => {
                    props.setPageColor(!props.pageColor);
                  }}
                >
                  {props.pageColor ? (
                    <BiMoon size={30} />
                  ) : (
                    <>
                      <BiSun size={30} />
                    </>
                  )}
                </button>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
}
