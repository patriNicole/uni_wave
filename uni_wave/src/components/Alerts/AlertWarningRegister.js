import React from "react";
import "./Alerts.css";

import { useSelector } from "react-redux";

export default function AlertWarning() {

    const { error } = useSelector(state => state.auth);

    return (
        <>
            <div className="alert warning"> 
                <strong>Warning!</strong> {error}
            </div>
        </>
    );
}