import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import MainTeachingCourse from "../MainComponents/TeachingComponent/MainCoursePage/MainCoursePage.js";

export default function MainCourse(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <MainTeachingCourse/>
        </>
    );
}