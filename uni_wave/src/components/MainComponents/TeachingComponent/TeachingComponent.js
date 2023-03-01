import React from "react";
import "./TeachingComponent.css";

import InputTeaching from "./InputTeaching/InputTeaching.js";
import TeachingCourses from "./TeachingCourses/TeachingCourses.js";

export default function TeachingComponent() {
    return (
        <>
            <div className="teachingComponent">
                <InputTeaching/>
                <TeachingCourses/>
            </div>
        </>
    );
}