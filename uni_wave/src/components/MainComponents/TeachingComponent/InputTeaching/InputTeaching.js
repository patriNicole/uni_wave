import React, { useState, useEffect, useRef } from "react";
import "./InputTeaching.css";

//import { MdAddCircleOutline } from "react-icons/md";
import { FaChalkboardTeacher, FaFileVideo } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdAttachFile } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { inputCourse } from "../../../../store/actions/teachingAction.js";

import { io } from "socket.io-client";

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
    socket.current.on("newCourse", (postData) => {
      // Add the new post to the posts state
      setCoursePosts((prevState) => [...prevState, postData]);
    });
  }, []);

  /* INPUT FIELDS */
  const [course, setNewCourse] = useState({
    teachingTitle: "",
    teachingOverview: "",
    teachingFile: "",
    teachingFileText: "",
    teachingVideo: "",
    teachingVideoText: "",
  });

  const handleChangeCourse = ({ currentTarget: input }) => {
    //each input has a name
    setNewCourse({ ...course, [input.name]: input.value });
  };

  const fileHandle = ({ currentTarget: input }) => {
    if (input.files.length !== 0) {
      setNewCourse({
        ...course,
        [input.name]: input.files[0],
      });
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
  };

  /* ------- User Input New Course ------- */
  const inputTeachingForm = (e) => {
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
      newCourse.append("teachingFile", course.teachingFile);
      newCourse.append("teachingFileText", course.teachingFileText);
      newCourse.append("teachingVideo", course.teachingVideo);
      newCourse.append("teachingVideoText", course.teachingVideoText);
      if (socket.current && socket.current.emit) {
        // Get the entries in an object
        const plainObject = Object.fromEntries(newCourse.entries());
        //console.log(plainObject)
        socket.current.emit("newCourse", plainObject);
      } else {
        console.log("Socket not available");
      }
      dispatch(inputCourse(newCourse));
    }
  };

  return (
    <div className="inputTeaching">
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
        </div>
        <div className="formTeachingColumnTwo">
          <label htmlFor="myfile" style={styleTwo}>
            <MdAttachFile size={30} /> Image/PDF
            <input
              type="file"
              id="myfile"
              name="teachingFile"
              style={{ marginBottom: "1rem" }}
              onChange={fileHandle}
              accept="image/*,application/pdf"
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
            <FaFileVideo size={30} /> Video
            <input
              type="file"
              id="videoInput"
              name="teachingVideo"
              style={{ marginBottom: "1rem" }}
              onChange={fileHandle}
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
