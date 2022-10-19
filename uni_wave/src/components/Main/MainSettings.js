import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import SettingsComponent from "../MainComponents/SettingsComponent/SettingsComponent.js";

export default function MainSettings(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <SettingsComponent/>
        </>
    );
}