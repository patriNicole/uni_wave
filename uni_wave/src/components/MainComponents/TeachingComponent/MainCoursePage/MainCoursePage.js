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
    navigate("/teaching");
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    //dispatch(editCourse(course._id));
  }; 

  return (
    <div className="courseComponent">
      {course && (
        <>
          <div className="coursePageTitle">
            {course.senderName === userInfo.username ? (
              <div className="editTitleCourse">
                <p>{course.teachingTitle}</p>
                <button className="editCourse" onClick={handleEditCourse}>
                  Edit
                </button>
              </div>
            ): (<p>{course.teachingTitle}</p>)} 
            <div className="userCourseInfo">
              <img
                className="userImageTop"
                src={`${course.senderImage}`}
                alt="userPicture"
              />
              <div className="allUserCourseInfo">
                <p>{course.senderName}</p>
                <p>{course.senderEmail}</p>
              </div>
            </div>
          </div>
          <div className="overviewCourseComponent">
          {course.senderName === userInfo.username ? (
              <div className="editTitleCourse">
                <p className="overviewCourse">{course.teachingOverview}</p>
                <button className="editCourse" onClick={handleEditCourse}>
                  Edit
                </button>
              </div>
            ): (<p className="overviewCourse">{course.teachingOverview}</p>)} 
          </div>
          
          {/* If user logged in same as the one who posted
          then he/she will be able to edit the post */}
          {course.senderName === userInfo.username && (
            <button className="deleteCourse" onClick={handleDeleteCourse}>
                Delete Entire Course
              </button>
          )}
        </>
      )}
    </div>
  );
}
