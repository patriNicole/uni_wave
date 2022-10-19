import React from "react";
import SideNav from './SideNav/SideNav.js';
import TopNav from "./TopNav/TopNav.js";
import MainComponent from "../MainComponents/MainComponent/MainComponent.js";

export default function Main(props) {
    return (
        <>
            <TopNav/>
            <SideNav pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            <MainComponent/>
        </>
    );
}