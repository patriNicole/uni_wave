import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import MapComponent from "../MainComponents/MapComponent/MapComponent.js";

export default function MainMap(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <MapComponent/>
        </>
    );
}