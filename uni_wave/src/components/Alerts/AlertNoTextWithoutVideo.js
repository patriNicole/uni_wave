import React from "react";
import "./Alerts.css";

export default function AlertNoTextWithoutVideo() {
    return (
        <>
            <div className="alert warning-video"> 
                <strong>Warning!</strong> Cannot add Text Without Video/PDF/Image!
            </div>
        </>
    );
}