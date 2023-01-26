import React from "react";
import "./Alerts.css";

export default function AlertWarning() {
    return (
        <>
            <div className="alert warning"> 
                <strong>Warning!</strong> Password needs to have a minimum of 8 characters!
            </div>
        </>
    );
}