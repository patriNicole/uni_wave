import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import InfoComponent from "../MainComponents/InfoComponent/InfoComponent.js";

export default function MainInfo() {
    return (
        <>
            <TopNav/>
            <SideNav/>
            <InfoComponent/>
        </>
    );
}