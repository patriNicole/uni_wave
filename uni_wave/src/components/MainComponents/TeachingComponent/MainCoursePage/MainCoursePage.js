import React, { useState, useEffect, useRef } from "react";
import "./MainCoursePage.css";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  updateCourse,
  deleteCourse,
} from "../../../../store/actions/teachingAction.js";

export default function TeachingCourses() {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  // Get the State passed through the link from TeachingCourse
  const location = useLocation();
  const course = location.state.course;
  //console.log(course);

  /* EDIT MODE */
  const [editModeOverview, setEditModeOverview] = useState(false);
  const [editModeTitle, setEditModeTitle] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(course.teachingTitle);
  const [updatedOverview, setUpdatedOverview] = useState(
    course.teachingOverview
  );
  // Use The input text to refer to it
  const textareaRefOverview = useRef();
  const textareaRefTitle = useRef();

  const navigate = useNavigate();
  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const handleDeleteCourse = (e) => {
    e.preventDefault();
    dispatch(deleteCourse(course._id));
    navigate("/teaching");
  };

  const handleEditCourseOverview = (e) => {
    e.preventDefault();
    setEditModeOverview(true);
  };

  const handleEditCourseTitle = (e) => {
    e.preventDefault();
    setEditModeTitle(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedOverviewValue = textareaRefOverview?.current?.value || updatedOverview;
    const updatedTitleValue = textareaRefTitle?.current?.value || updatedTitle;
    const updatedCourse = {
      ...course,
      teachingTitle: updatedTitleValue,
      teachingOverview: updatedOverviewValue,
    };
    //console.log(updatedCourse);
    setUpdatedOverview(updatedOverviewValue);
    setUpdatedTitle(updatedTitleValue);
    setEditModeOverview(false);
    setEditModeTitle(false);
    dispatch(updateCourse(updatedCourse));
  };

  return (
    <div className="courseComponent">
      {course && (
        <>
          <div className="coursePageTitle">
            {course.senderName === userInfo.username ? (
              editModeTitle === true ? (
                <div className="editTitleCourse">
                  <textarea
                    defaultValue={course.teachingTitle}
                    ref={textareaRefTitle}
                    className="myTextareaClassTitle"
                    style={{ color: "white", backgroundColor: "transparent" }}
                  ></textarea>
                  <div className="editSaveCancel">
                    <button className="editCourse" onClick={handleSaveChanges}>
                      Save
                    </button>
                    <button
                      className="editCourse"
                      onClick={(e) => {
                        setEditModeTitle(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="editTitleCourse">
                  <p>{course.teachingTitle}</p>
                  <button
                    className="editCourse"
                    onClick={handleEditCourseTitle}
                  >
                    Edit
                  </button>
                </div>
              )
            ) : (
              <p>{course.teachingTitle}</p>
            )}

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
            <p className="titleCourseOverview">Overview</p>
            {course.senderName === userInfo.username ? (
              editModeOverview === true ? (
                <div className="editTitleCourse">
                  <textarea
                    className="overviewCourse"
                    defaultValue={course.teachingOverview}
                    ref={textareaRefOverview}
                    style={{ color: "white", backgroundColor: "transparent" }}
                  ></textarea>
                  <div className="editSaveCancel">
                    <button className="editCourse" onClick={handleSaveChanges}>
                      Save
                    </button>
                    <button
                      className="editCourse"
                      onClick={(e) => {
                        setEditModeOverview(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="editTitleCourse">
                  <p className="overviewCourse">{course.teachingOverview}</p>
                  <button
                    className="editCourse"
                    onClick={handleEditCourseOverview}
                  >
                    Edit
                  </button>
                </div>
              )
            ) : (
              <p className="overviewCourse">{course.teachingOverview}</p>
            )}
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
