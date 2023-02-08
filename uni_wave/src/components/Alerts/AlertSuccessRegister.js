import React from "react";
import "./Alerts.css";

import { useSelector } from "react-redux";

export default function AlertSuccessRegister() {

    const { successMessage } = useSelector(state => state.auth);

    return (
        <>
            <div className="alert success-registered"> 
                <strong>{successMessage}</strong> 
            </div>
        </>
    );
}