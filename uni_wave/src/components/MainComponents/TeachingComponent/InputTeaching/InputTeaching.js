import React, { useState, useEffect, useRef } from "react";
import "./InputTeaching.css";

import { HiOutlineLink } from "react-icons/hi";
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

  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
  });

  useEffect(() => {
    socket.current.on('newCourse', (postData) => {
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
    if( newTitle !== undefined) {
      const newCourse = {
        senderId: userInfo.id,
        senderName: userInfo.username,
        senderEmail: userInfo.email,
        senderImage: userInfo.image,
        teachingTitle: newTitle,
      };
      if (socket.current && socket.current.emit) {
        socket.current.emit("newCourse", newCourse);
      } else {
        console.log("Socket not available");
      }
      dispatch(inputCourse(newCourse));
    }
  };

  const inputTeachingTitle = (e) => {
    setNewTitle(e.target.value);
  }

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
            />
          </label>
        </div>
        <div className="formTeachingColumnTwo">
          <label htmlFor="myfile" style={styleTwo}>
            <MdAttachFile size={30} /> Select File
            <input
              type="file"
              id="myfile"
              name="myfile"
              style={{ marginBottom: "1rem" }}
            />
          </label>
          <label htmlFor="homepage">
            <HiOutlineLink size={30} style={style} />
            <input
              className="inputTeachingTitle"
              type="url"
              id="homepage"
              name="homepage"
              style={{ marginBottom: "1rem" }}
              placeholder="Add Link"
            />
          </label>
          <label htmlFor="videoInput" style={styleTwo}>
            <FaFileVideo size={30} /> Add your videos
            <input
              type="file"
              id="videoInput"
              accept="video/mp4,video/x-m4v,video/*"
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