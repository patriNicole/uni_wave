import React, { useState } from "react";
import "./TeachingComponent.css";

import InputTeaching from "./InputTeaching/InputTeaching.js";
import TeachingCourses from "./TeachingCourses/TeachingCourses.js";

export default function TeachingComponent() {
    const [coursePosts, setCoursePosts] = useState([]);
    return (
        <>
            <div className="teachingComponent">
                <InputTeaching
                  coursePosts={coursePosts}
                  setCoursePosts={setCoursePosts}
                />
                <TeachingCourses
                  coursePosts={coursePosts}
                  setCoursePosts={setCoursePosts}
                />
            </div>
        </>
    );
}