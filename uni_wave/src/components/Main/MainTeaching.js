import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import TeachingComponent from "../MainComponents/TeachingComponent/TeachingComponent.js";

export default function MainTeaching() {
    return (
        <>
            <TopNav/>
            <SideNav/>
            <TeachingComponent/>
        </>
    );
}