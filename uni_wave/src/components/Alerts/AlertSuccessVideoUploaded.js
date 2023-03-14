import React from "react";
import "./Alerts.css";

import { useSelector } from "react-redux";

export default function AlertSuccessVideoUploaded() {

    const { successMessage } = useSelector(state => state.auth);

    return (
        <>
            <div className="alert success-video-uploaded"> 
                <strong>New Video Uploaded! Page Loading ... </strong> 
            </div>
        </>
    );
}