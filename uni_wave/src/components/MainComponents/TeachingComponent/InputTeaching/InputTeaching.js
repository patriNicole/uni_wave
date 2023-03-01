import React from "react";
import "./InputTeaching.css";

import { HiOutlineLink } from "react-icons/hi"; 
import { FaChalkboardTeacher, FaFileVideo } from "react-icons/fa"; 
import { GiTeacher } from "react-icons/gi"; 
import { MdAttachFile } from "react-icons/md";

export default function InputTeaching() {
  //style for the icons
  const style = { color: "white", fontSize: "1.5em" };
  const styleTwo = { color: "white", fontSize: "1em" };

  return (
    <div className="inputTeaching">
      <form className="formTeachingInput">
        <div className="formTeachingColumn">
          <label for="title"><FaChalkboardTeacher size={30} style={style}/>
          <input className="inputTeachingTitle" type="text" id="title" name="title" style={{marginBottom: '1rem'}} placeholder="Course Title" /></label>
          <label for="lname"><GiTeacher size={30} style={style}/>
          <input className="inputTeachingTitle" type="text" id="lname" name="lname" style={{marginBottom: '1rem'}} placeholder="Overview" /></label>
        </div>
        <div className="formTeachingColumnTwo">
          <label for="myfile" style={styleTwo}><MdAttachFile size={30} /> Select File
          <input type="file" id="myfile" name="myfile" style={{marginBottom: '1rem'}} /></label>
          <label for="homepage"><HiOutlineLink size={30} style={style}/>
          <input className="inputTeachingTitle" type="url" id="homepage" name="homepage" style={{marginBottom: '1rem'}} placeholder="Add Link" /></label>
          <label for="videoInput" style={styleTwo}><FaFileVideo size={30} /> Add your videos
          <input
            type="file"
            id="videoInput"
            accept="video/mp4,video/x-m4v,video/*"
          /></label>
        </div>
        <div className="formTeachingButton">
          <input className="teachingInput__submit" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
