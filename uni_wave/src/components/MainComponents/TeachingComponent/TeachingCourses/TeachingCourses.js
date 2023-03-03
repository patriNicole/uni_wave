import React, { useState, useEffect, useRef } from "react";
import "./TeachingCourses.css";

import { io } from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../../../store/actions/teachingAction.js";

export default function TeachingCourses() {

  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.teaching);

  console.log(courses);

  useEffect(() => {
    dispatch(getCourse());
  }, []);

  return (
    <div className="teachingCourse">
      {courses && courses.length > 0
          ? courses.map((course, index) => (
            <div key={index}>
      <div className="containerTeachingCourses">
        
        <div className="itemCourse">
          <div className="detailsCourse">
            <h1> {course.courseDetails.teachingTitle} </h1>
            <div className="teachingCourseHeader">
              <img className="activeUser" src={`${course.senderImage}`} alt="userPicture"/>
              <h4> {course.senderName}</h4>
            </div>
            <h4> {course.senderEmail}</h4>
          </div>
        </div>
        </div>
        </div>
      ))
      : null}
    </div>
  );
}
