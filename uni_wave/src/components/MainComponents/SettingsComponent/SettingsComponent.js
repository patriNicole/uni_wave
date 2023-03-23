import React, { useState, useEffect, useRef } from "react";
import "./SettingsComponent.css";

import { useDispatch, useSelector } from "react-redux";
import updateUserProfile from "../../../store/actions/updateProfileUserAction.js";

import AlertWarningMissingUsernameSettings from "../../Alerts/AlertWarningMissingUsernameSettings.js";
import AlertWarningMissingPasswordSettings from "../../Alerts/AlertWarningMissingPasswordSettings.js";
import AlertWarning from "../../Alerts/AlertWarningRegister.js";

export default function SettingsComponent() {
  const dispatch = useDispatch();
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);
  const { error, successMessage} = useSelector(state => state.auth);
  const [errorDisplay, setErrorDisplay] = useState(false);
  useEffect(()=>{
    if(error) {
      setErrorDisplay(true);
    }
  }, [error]);

  useEffect(()=>{
    if(error) {
      setErrorDisplay(false);
    }
  }, [!error]);

  const [imageData, setImageData] = useState("");
  const [imageDataDB, setImageDataDB] = useState("");
  const inputFileRef = useRef(null);

  const [usernameProvide, setUsernameProvide] = useState(false);
  const textareaRefUsername = useRef();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordProvided, setPasswordProvided] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0] !== 0) {
        setImageDataDB(e.target.files[0]);
      }

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
        setPasswordProvided(false);
        const r = window.confirm("Would you like to submit your updates?");
        if (r === true) {
            const formData = new FormData();
            const updatedUsername = textareaRefUsername?.current?.value.trim();
            //console.log(userInfo.id)
            formData.append("id", userInfo.id);
            formData.append("imageData", imageDataDB);
            formData.append("username", updatedUsername);
            
            if(oldPassword && newPassword) {
                formData.append("oldPassword", oldPassword);
                formData.append("newPassword", newPassword);
                //console.log(oldPassword, newPassword);
            } 

            if((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
                setPasswordProvided(true);
            }
            // Dispatch an action to update the user's profile picture in the store
            dispatch(updateUserProfile(formData));
        }
    } else {
        setUsernameProvide(true);
    }
  };

  return (
    <>
      <div className="settingsComponent">
        {usernameProvide && <AlertWarningMissingUsernameSettings/>}
        {passwordProvided && <AlertWarningMissingPasswordSettings/>}
        {errorDisplay && <AlertWarning/>}

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
              type="password"
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
              type="password"
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
