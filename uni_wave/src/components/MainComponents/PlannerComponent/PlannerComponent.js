import React from "react";
import "./PlannerComponent.css";
import Calendar from "./Calendar/Calendar.js";
import PlannerToDo from "./Todo/PannerToDo.js";

export default function PlannerComponent(props) {
    return (
        <>
            <div className="plannerComponent">
                <Calendar pageColor={props.pageColor} setPageColor={props.setPageColor}/>
                <PlannerToDo pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            </div>
        </>
    );
}