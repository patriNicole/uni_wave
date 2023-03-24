import React, { useState, useEffect, useRef } from "react";
import "./InputTeaching.css";

//import { MdAddCircleOutline } from "react-icons/md";
import { FaChalkboardTeacher, FaFileVideo } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { VscFilePdf } from "react-icons/vsc";
import { MdAttachFile } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { inputCourse } from "../../../../store/actions/teachingAction.js";

import { io } from "socket.io-client";

import { getCourse } from "../../../../store/actions/teachingAction.js";

import AlertSuccessVideoUploaded from "../../../Alerts/AlertSuccessVideoUploaded.js";
import AlertNoTextWithoutVideo from "../../../Alerts/AlertNoTextWithoutVideo.js";

export default function InputTeaching({ setCoursePosts }) {
  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };
  const styleTwo = { color: "white", fontSize: "1em" };

  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
  });

  useEffect(() => {
    dispatch(getCourse());
  }, []);

  useEffect(() => {
    socket.current.on("newCourse", (postData) => {
      // Add the new post to the posts state
      setCoursePosts((prevState) => [...prevState, postData]);
    });
  }, [dispatch]);

  /* INPUT FIELDS */
  const [course, setNewCourse] = useState({
    teachingTitle: "",
    teachingOverview: "",
    teachingFile: "",
    teachingFileText: "",
    teachingVideo: "",
    teachingVideoText: "",
    pdfLink: "",
  });

  // File Name Displayed
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedVideoName, setSelectedVideoName] = useState("");

  // In order to display image/pdf/video in real-time
  const [teachingFileSocket, setTeachingFileSocket] = useState(null);

  const handleChangeCourse = ({ currentTarget: input }) => {
    //each input has a name
    setNewCourse({ ...course, [input.name]: input.value });
  };

  // Cannot Input Text without Video/PDF/Image
  const [textVideoFile, setTextVideoFile] = useState(false);

  const fileHandle = ({ currentTarget: input }) => {
    if (input.files.length !== 0) {
      setNewCourse({
        ...course,
        [input.name]: input.files[0],
      });
      setSelectedFileName(input.files[0].name);
    }
    // In order to display image/pdf/video in real-time
    const reader = new FileReader();
    reader.onload = () => {
      setTeachingFileSocket(reader.result);
    };
    reader.readAsDataURL(input.files[0]);
  };

  const [videoUploade, setVideoUploaded] = useState(false);
  const videoHandle = ({ currentTarget: input }) => {
    if (input.files.length !== 0) {
      setNewCourse({
        ...course,
        [input.name]: input.files[0],
      });
      setSelectedVideoName(input.files[0].name);
    }
  };

  /* ------- User Input New Course ------- */
  const inputTeachingForm = async (e) => {
    setVideoUploaded(false);
    setTextVideoFile(false);
    e.preventDefault();
    //console.log(userInfo)
    const newCourse = new FormData();

    if (course.teachingTitle !== undefined) {
      newCourse.append("senderId", userInfo.id);
      newCourse.append("senderName", userInfo.username);
      newCourse.append("senderEmail", userInfo.email);
      newCourse.append("senderImage", userInfo.image);
      newCourse.append("teachingTitle", course.teachingTitle);
      newCourse.append("teachingOverview", course.teachingOverview);
      newCourse.append("pdfLink", course.pdfLink);

      // Cannot Input Text without Video/PDF/Image
      if (course.teachingFile && course.teachingFileText) {
        newCourse.append("teachingFileText", course.teachingFileText);
      } else if (!course.teachingFile && course.teachingFileText) {
        setTextVideoFile(true);
        return;
      }

      if (course.teachingVideo && course.teachingVideoText) {
        newCourse.append("teachingVideoText", course.teachingVideoText);
      } else if (!course.teachingVideo && course.teachingVideoText) {
        setTextVideoFile(true);
        return;
      }

      if (socket.current && socket.current.emit && textVideoFile === false) {
        // Get the entries in an object
        let plainObject = Object.fromEntries(newCourse.entries());
        // In order to display image/pdf/video in real-time
        //plainObject.teachingVideo = teachingVideoSocket;
        plainObject.teachingFile = teachingFileSocket;
        plainObject.teachingVideo = "";
        socket.current.emit("newCourse", plainObject);
      } else {
        console.log("Socket not available");
      }
      newCourse.append("teachingFile", course.teachingFile);
      newCourse.append("teachingVideo", course.teachingVideo);

      if (course.teachingVideo) {
        setVideoUploaded(true);
      }

      if (textVideoFile === false) {
        await dispatch(inputCourse(newCourse));
      }

      if (course.teachingVideo) {
        window.location.reload(false);
      }
    }
  };

  return (
    <div className="inputTeaching">
      {videoUploade && <AlertSuccessVideoUploaded />}
      {textVideoFile && <AlertNoTextWithoutVideo />}
      <form className="formTeachingInput" onSubmit={inputTeachingForm}>
        <div className="formTeachingColumn">
          <label htmlFor="teachingTitle">
            <FaChalkboardTeacher size={30} style={style} />
            <input
              className="inputTeachingTitle"
              type="text"
              id="teachingTitle"
              name="teachingTitle"
              style={{ marginBottom: "1rem" }}
              placeholder="Course Title"
              onChange={handleChangeCourse}
              value={course.teachingTitle}
              required
            />
          </label>
          <label htmlFor="teachingOverview">
            <GiTeacher size={30} style={style} />
            <input
              className="inputTeachingTitle"
              type="text"
              id="teachingOverview"
              name="teachingOverview"
              style={{ marginBottom: "1rem" }}
              placeholder="Overview"
              onChange={handleChangeCourse}
              value={course.teachingOverview}
            />
          </label>
          <label htmlFor="pdfLink" style={styleTwo}>
            <VscFilePdf size={30} style={style} />
            <input
              className="inputTeachingTitle"
              type="text"
              id="pdfLink"
              name="pdfLink"
              style={{ marginBottom: "1rem" }}
              placeholder="PDF or Website Link"
              onChange={handleChangeCourse}
              value={course.pdfLink}
            />
          </label>
        </div>
        <div className="formTeachingColumnTwo">
          <label htmlFor="myfile" style={styleTwo}>
            <MdAttachFile size={30} />
            {course.teachingFile ? (
              <label htmlFor="myfile">
                {selectedFileName ? (
                  <span
                    style={{
                      color: "white",
                      fontSize: "12px",
                      display: "block",
                      marginTop: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {selectedFileName}
                  </span>
                ) : (
                  ""
                )}
              </label>
            ) : (
              "Image"
            )}
            <input
              type="file"
              id="myfile"
              name="teachingFile"
              style={{ marginBottom: "1rem" }}
              onChange={fileHandle}
              accept="image/*"
            />
            <input
              className="inputTeachingTitle"
              type="text"
              id="myfile"
              name="teachingFileText"
              style={{ marginBottom: "1rem" }}
              placeholder="File Description"
              onChange={handleChangeCourse}
              value={course.teachingFileText}
              //ref={ref}
            />
          </label>

          {/* ------------------------------------ */}
          <label htmlFor="videoInput" style={styleTwo}>
            <FaFileVideo size={30} />{" "}
            {course.teachingVideo ? (
              <label htmlFor="myfile">
                {selectedVideoName ? (
                  <span
                    style={{
                      color: "white",
                      fontSize: "12px",
                      display: "block",
                      marginTop: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {selectedVideoName}
                  </span>
                ) : (
                  ""
                )}
              </label>
            ) : (
              "Video"
            )}
            <input
              type="file"
              id="videoInput"
              name="teachingVideo"
              style={{ marginBottom: "1rem" }}
              onChange={videoHandle}
              accept="video/*"
            />
            <input
              className="inputTeachingTitle"
              type="text"
              id="videoInput"
              name="teachingVideoText"
              style={{ marginBottom: "1rem" }}
              placeholder="Video Description"
              onChange={handleChangeCourse}
              value={course.teachingVideoText}
            />
          </label>
        </div>
        <div className="formTeachingButton">
          <input
            className="teachingInput__submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}
