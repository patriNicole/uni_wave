import React from "react";
import "./Alerts.css";

export default function AlertWarning() {
    return (
        <>
            <div className="alert warning"> 
                <strong>Warning!</strong> You need to provide both new and old passwords!
            </div>
        </>
    );
}