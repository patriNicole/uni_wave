import React from "react";
import "./MainComponent.css";
import { Link } from "react-router-dom";

export default function MainComponent() {
    return (
        <>
            <div className="mainComponentWelcome">hi</div>
            <div className="mainComponentPlanner">
                <Link to="/planner">planner</Link>
            </div>
            <div className="mainComponentMap">
                <Link to="/map">map</Link>
            </div>
            <div className="mainComponentGroup">
                <Link to="/groups">group</Link>
            </div>
            <div className="mainComponentTeaching">
                <Link to="/teaching">teaching</Link>
            </div>
            <div className="mainComponentInfo">
                <Link to="/info">info</Link>
            </div>
        </>
    );
}