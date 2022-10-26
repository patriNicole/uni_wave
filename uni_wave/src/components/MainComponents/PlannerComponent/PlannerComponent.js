import React from "react";
import "./PlannerComponent.css";
import Calendar from "./Calendar/Calendar.js";

export default function PlannerComponent(props) {
    return (
        <>
            <div className="plannerComponent">
                <Calendar pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            </div>
        </>
    );
}