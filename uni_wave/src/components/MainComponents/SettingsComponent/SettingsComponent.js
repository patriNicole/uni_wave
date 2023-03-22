import React, { useState, useEffect, useRef } from "react";
import "./SettingsComponent.css";

import { useDispatch, useSelector } from "react-redux";

import AlertWarningMissingUsernameSettings from "../../Alerts/AlertWarningMissingUsernameSettings.js";

export default function SettingsComponent() {
  const dispatch = useDispatch();
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);
  const [imageData, setImageData] = useState(null);
  const inputFileRef = useRef(null);
  const [usernameProvide, setUsernameProvide] = useState(false);
  const textareaRefUsername = useRef();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    if(textareaRefUsername?.current?.value.trim()) {
        setUsernameProvide(false);
        const r = window.confirm("Would you like to submit your updates?");
        if (r === true) {
            const formData = new FormData();
            const updatedUsername = textareaRefUsername?.current?.value.trim();
            console.log(updatedUsername)
            formData.append("userId", userInfo._id);
            formData.append("imageData", imageData);
            // Dispatch an action to update the user's profile picture in the store
            //dispatch(updateUser(response.data));
        }
    } else {
        setUsernameProvide(true);
    }
  };

  return (
    <>
      <div className="settingsComponent">
        {usernameProvide && <AlertWarningMissingUsernameSettings/>}
        <div className="allUserSettingsInfo">
          <p>User Settings</p>
        </div>
        <div className="userChangeProfilePicture">
          <p>{userInfo.email}</p>
        </div>
        <div className="mainChanging">
          <div className="leftSettings">
            <div className="userChangeProfilePicture">
              <p>Update Image</p>
              {!imageData && (<img
                className="userSettingsImage"
                src={`${userInfo.image}`}
                alt="userPicture"
              />)}
              {imageData && (
                <img
                  className="userSettingsImage"
                  src={imageData}
                  alt="userPicture"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputFileRef}
                style={{ display: "none" }}
              />
              <button className="uploadProfilePicture" onClick={() => inputFileRef.current.click()}>
                Upload Profile Picture
              </button>
            </div>
            <div className="userChangeProfileUsername">
              <p>Update Username</p>
              <div className="editTitleCourse">
                  <textarea
                    defaultValue={userInfo.username}
                    ref={textareaRefUsername}
                    className="myTextareaClassUsername"
                    style={{ color: "white", backgroundColor: "transparent" }}
                  ></textarea>
                </div>
            </div>
          </div>
          <div className="rightSettings">
            <div className="userChangeProfilePassword">
              <p>Update Password</p>
              <input
              className="inputTeachingTitle"
              type="text"
              id="myfile"
              name="teachingFileText"
              style={{ marginBottom: "1rem" }}
              placeholder="Old Password"
              onChange={(e) => {
                setOldPassword(e.target.value);
                //console.log(oldPassword);
              }}
              value={oldPassword}
            />
            <input
              className="inputTeachingTitle"
              type="text"
              id="myfile"
              name="teachingFileText"
              style={{ marginBottom: "1rem" }}
              placeholder="New Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
            />
            </div>
          </div>
        </div>
        <button className="saveSettings" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </>
  );
}
