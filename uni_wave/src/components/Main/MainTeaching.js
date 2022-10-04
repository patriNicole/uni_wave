import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import TeachingComponent from "../MainComponents/TeachingComponent/TeachingComponent.js";

export default function MainTeaching(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <TeachingComponent/>
        </>
    );
}