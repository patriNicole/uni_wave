import React from "react";
import "./PlannerComponent.css";
import Calendar from "./Calendar/Calendar.js";
import TodoList from "./Todo/TodoList.js";

export default function PlannerComponent(props) {
    return (
        <>
            <div className="plannerComponent">
                <Calendar pageColor={props.pageColor} setPageColor={props.setPageColor}/>
                <TodoList pageColor={props.pageColor} setPageColor={props.setPageColor}/>
            </div>
        </>
    );
}