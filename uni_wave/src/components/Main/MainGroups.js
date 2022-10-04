import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import GroupComponent from "../MainComponents/GroupComponent/GroupComponent.js";

export default function MainPlanner(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <GroupComponent/>
        </>
    );
}