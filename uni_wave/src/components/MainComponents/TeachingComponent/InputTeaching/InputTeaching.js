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

  /* INPUT FIELDS */
  /* NEW Title from user */
  const [newTitle, setNewTitle] = useState("");
  /* Course Overview */
  const [newOverview, setNewOverview] = useState("");
  /* NEW File and Text from user */
  const [newFile, setNewFile] = useState("");
  const [newFileText, setNewFileText] = useState("");

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

  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  /* ------- User Input New Course ------- */
  const inputTeachingForm = (e) => {
    e.preventDefault();
    //console.log(userInfo)
    const newCourse = new FormData(); 

    if (newTitle !== undefined) {
        newCourse.append("senderId", userInfo.id);
        newCourse.append("senderName", userInfo.username);
        newCourse.append("senderEmail", userInfo.email);
        newCourse.append("senderImage", userInfo.image);
        newCourse.append("teachingTitle", newTitle);
        newCourse.append("teachingOverview", newOverview);
      if (socket.current && socket.current.emit) {
        // Get the entries in an object
        const plainObject = Object.fromEntries(newCourse.entries());
        socket.current.emit("newCourse", plainObject);
      } else {
        console.log("Socket not available");
      }
      dispatch(inputCourse(newCourse));
    }
  };

  const inputTeachingTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const inputTeachingOverview = (e) => {
    setNewOverview(e.target.value);
  };

  const [inputRefs, setInputRefs] = useState([React.createRef()]);
  const handleAddInput = () => {
    setInputRefs([...inputRefs, React.createRef()]);
  };

  return (
    <div className="inputTeaching">
      <form className="formTeachingInput" onSubmit={inputTeachingForm}>
        <div className="formTeachingColumn">
          <label htmlFor="title">
            <FaChalkboardTeacher size={30} style={style} />
            <input
              className="inputTeachingTitle"
              type="text"
              id="title"
              name="title"
              style={{ marginBottom: "1rem" }}
              placeholder="Course Title"
              onChange={inputTeachingTitle}
              value={newTitle}
              required
            />
          </label>
          <label htmlFor="lname">
            <GiTeacher size={30} style={style} />
            <input
              className="inputTeachingTitle"
              type="text"
              id="lname"
              name="lname"
              style={{ marginBottom: "1rem" }}
              placeholder="Overview"
              onChange={inputTeachingOverview}
              value={newOverview}
            />
          </label>
        </div>
        <div className="formTeachingColumnTwo">
          {/* ------------ Input File ------------ */}
          {/*
          {inputRefs.map((ref, index) => (
            <div key={index}>
            </div>
          ))}
          <button type="button" onClick={handleAddInput}>
            <MdAddCircleOutline size={30} style={styleTwo} />
          </button>
          */}
          <label htmlFor="myfile" style={styleTwo}>
            <MdAttachFile size={30} /> Select File
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ marginBottom: "1rem" }}
            />
            <input
              className="inputTeachingTitle"
              type="text"
              id="myfile"
              name="myfile"
              style={{ marginBottom: "1rem" }}
              placeholder="Overview"
              onChange={inputTeachingOverview}
              value={newOverview}
              //ref={ref}
            />
          </label>

          {/* ------------------------------------ */}
          <label htmlFor="videoInput" style={styleTwo}>
            <FaFileVideo size={30} /> Add your video
            <input
              type="file"
              id="videoInput"
              accept="video/mp4,video/x-m4v,video/*"
              style={{ marginBottom: "1rem" }}
            />
            <input
              className="inputTeachingTitle"
              type="text"
              id="videoInput"
              name="videoInput"
              style={{ marginBottom: "1rem" }}
              placeholder="Overview"
              onChange={inputTeachingOverview}
              value={newOverview}
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
