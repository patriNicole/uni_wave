import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import PlannerComponent from "../MainComponents/PlannerComponent/PlannerComponent.js";

export default function MainPlanner(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <PlannerComponent pageColor={props.pageColor} setPageColor={props.setPageColor}/>
        </>
    );
}