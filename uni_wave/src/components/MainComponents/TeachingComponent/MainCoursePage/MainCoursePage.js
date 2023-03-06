import React, { useState, useEffect, useRef } from "react";
import "./MainCoursePage.css";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { deleteCourse } from "../../../../store/actions/teachingAction.js";

export default function TeachingCourses() {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  // Get the State passed through the link from TeachingCourse
  const location = useLocation();
  const course = location.state.course;
  //console.log(course);

  const navigate = useNavigate();
  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const handleDeleteCourse = (e) => {
    e.preventDefault();
    dispatch(deleteCourse(course._id));
    navigate('/teaching');
  }

  return (
    <div className="courseComponent">
      {course && (
        <>
          <p>{course.teachingTitle}</p>
          <p>{course.senderName}</p>
          <p>{course.senderEmail}</p>
          <img
            className="activeUser"
            src={`${course.senderImage}`}
            alt="userPicture"
          />
          {/* If user logged in same as the one who posted
      then he/she will be able to edit the post */}
          {course.senderName === userInfo.username && (
            <div className="buttonCourses">
              <button className="editCourse">Edit</button>
              <button className="deleteCourse" onClick={handleDeleteCourse}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
