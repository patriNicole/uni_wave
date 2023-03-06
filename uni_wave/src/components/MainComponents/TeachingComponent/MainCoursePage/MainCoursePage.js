import React, { useState, useEffect, useRef } from "react";
import "./MainCoursePage.css";

import { useLocation } from "react-router-dom";

export default function TeachingCourses() {
  // Get the State passed through the link from TeachingCourse
  const location = useLocation();
  const course = location.state.course;
  //console.log(course)

  return (
    <div className="courseComponent">
      <p>{course.teachingTitle}</p>
      <p>{course.senderName}</p>
      <p>{course.senderEmail}</p>
      <img
        className="activeUser"
        src={`${course.senderImage}`}
        alt="userPicture"
      />
      <div className="buttonCourses">
        <button className="editCourse">Edit</button>
        <button className="deleteCourse">Delete</button>
      </div>
    </div>
  );
}
