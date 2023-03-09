import React, { useState, useEffect, useRef } from "react";
import "./MainCoursePage.css";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  updateCourse,
  deleteCourse,
  deletePDF,
  deleteFile,
  deleteVideo
} from "../../../../store/actions/teachingAction.js";

import AlertWarningMissingTitleTeaching from "../../../Alerts/AlertWarningMissingTitleTeaching.js";

export default function TeachingCourses() {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  // Get the State passed through the link from TeachingCourse
  const location = useLocation();
  const course = location.state.course;
  //console.log(course.teachingFile);

  /* EDIT MODE */
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [editMode, setEditMode] = useState(false);
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

  // Delete a course entirely
  const handleDeleteCourse = (e) => {
    e.preventDefault();
    dispatch(deleteCourse(course._id));
    navigate("/teaching");
  };

  // Delete PDF
  const handleDeletePDF = (e) => {
    e.preventDefault();
    dispatch(deletePDF(course._id));
    navigate("/teaching");
  };

  // Delete Entire File (Image + Text)  
  const handleDeleteFile = (e) => {
    e.preventDefault();
    dispatch(deleteFile(course._id));
    navigate("/teaching");
  };

  // Delete Entire Video (Video + Text)
  const handleDeleteVideo = (e) => {
    e.preventDefault();
    dispatch(deleteVideo(course._id));
    navigate("/teaching");
  };

  // Set the Edit Mode On
  const handleEditCourse = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  // Course Updated and Saved
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Update the overview value - can be set to empty
    const updatedOverviewValue = textareaRefOverview?.current?.value || "";
    const updatedTitleValue = textareaRefTitle?.current?.value.trim();
    //console.log(`updatedTitleValue: '${updatedTitleValue}'`);
    // // Update the title value - cannot be set to empty
    // If title not provided cannot update course
    if (!updatedTitleValue) {
      setShouldUpdate(false);
    }
    // Update course
    if (updatedTitleValue) {
      setShouldUpdate(true);
      const updatedCourse = {
        ...course,
        teachingTitle: updatedTitleValue || course.teachingTitle,
        teachingOverview: updatedOverviewValue,
      };
      setUpdatedOverview(updatedOverviewValue);
      setUpdatedTitle(updatedTitleValue);
      // Edit Mode Off
      setEditMode(false);
      // Dispach Result in Redux
      dispatch(updateCourse(updatedCourse));
      // Link to Teaching Home Page
      navigate("/teaching");
    }
  };

  return (
    <div className="courseComponent">
      {!shouldUpdate && <AlertWarningMissingTitleTeaching />}
      {course && (
        <>
          <div className="coursePageTitle">
            {course.senderName === userInfo.username ? (
              editMode === true ? (
                <div className="editTitleCourse">
                  <textarea
                    defaultValue={course.teachingTitle}
                    ref={textareaRefTitle}
                    className="myTextareaClassTitle"
                    style={{ color: "white", backgroundColor: "transparent" }}
                  ></textarea>
                </div>
              ) : (
                <div className="editTitleCourse">
                  <p>{course.teachingTitle}</p>
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
              editMode === true ? (
                <div className="editTitleCourse">
                  <textarea
                    className="overviewCourse"
                    defaultValue={course.teachingOverview}
                    ref={textareaRefOverview}
                    style={{ color: "white", backgroundColor: "transparent" }}
                  ></textarea>
                </div>
              ) : (
                <div className="editTitleCourse">
                  <p className="overviewCourse">{course.teachingOverview}</p>
                </div>
              )
            ) : (
              <p className="overviewCourse">{course.teachingOverview}</p>
            )}
          </div>
          {/* ------------ VIDEO ------------ */}
          {course.teachingVideo && (
            <>
              <p className="titleCourseVideos">Video</p>
              <div className="videoTextComponent">
                <video width="700" height="400" controls>
                  <source src={course.teachingVideo} type="video/mp4" />
                </video>
                <p className="overviewVideo">{course.teachingVideoText}</p>
                {editMode && (
                  <button className="editCourse" onClick={handleDeleteVideo}>
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
          {/* ------------ PDF LINK ------------ */}
          {course.pdfLink && (
            <>
              <p className="titleCourseVideos">PDF</p>
              <div className="videoTextComponent">
                <iframe
                  src={course.pdfLink}
                  title="PDF"
                  width="100%"
                  height="500px"
                ></iframe>
                {editMode && (
                  <button className="editCourse" onClick={handleDeletePDF}>
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
          {/* ------------ IMAGE ------------ */}
          {course.teachingFile && (
            <>
              <p className="titleCourseVideos">Image</p>
              <div className="videoTextComponent">
                {course.teachingFile ? (
                  <img
                    className="imageFile"
                    src={`${course.teachingFile}`}
                    alt="userPicture"
                  />
                ) : (
                  ""
                )}
                <p className="overviewVideo">{course.teachingFileText}</p>
                {editMode && (
                  <button className="editCourse" onClick={handleDeleteFile}>
                    Delete
                  </button>
                )}
              </div>
            </>
          )}
          <div className="updateCourseButtons">
            {/* If user logged in same as the one who posted
          then he/she will be able to edit the post */}
            {course.senderName === userInfo.username && (
              <button className="deleteCourse" onClick={handleDeleteCourse}>
                Delete Entire Course
              </button>
            )}
            {course.senderName === userInfo.username ? (
              editMode ? (
                <div className="editSaveCancel">
                  <button className="editCourse" onClick={handleSaveChanges}>
                    Save
                  </button>
                  <button
                    className="editCourse"
                    onClick={(e) => {
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="editCourse" onClick={handleEditCourse}>
                  Edit
                </button>
              )
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}
