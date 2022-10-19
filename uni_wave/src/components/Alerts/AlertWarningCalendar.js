import React from "react";
import "./Alerts.css";

export default function AlertWarning() {
    return (
        <>
            <div className="alert warning"> 
                <strong>Warning!</strong> Start date should come before end date.
            </div>
        </>
    );
}