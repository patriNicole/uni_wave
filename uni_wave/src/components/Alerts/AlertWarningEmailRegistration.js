import React from "react";
import "./Alerts.css";

export default function AlertWarning() {
    return (
        <>
            <div className="alert warning"> 
                <strong>Warning!</strong> Email does not have a valid format!
            </div>
        </>
    );
}