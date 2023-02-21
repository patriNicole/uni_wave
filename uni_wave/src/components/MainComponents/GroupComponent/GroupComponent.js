import React, { useState, useEffect, useRef } from "react";

import "./GroupComponent.css";
import "../../Main/TopNav/TopNav.css";

import LeftGroupComponent from "./LeftGroupComponent/LeftGroupComponent.js";
import RightGroupComponent from "./RightGroupComponent/RightGroupComponent.js";

import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  messageSend,
  getMessage,
  imageSend
} from "../../../store/actions/messengerAction.js";

export default function GroupComponent() {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  /* GET CURRENT FRIEND */
  const [currentfriend, setCurrentFriend] = useState("");

  /* NEW MESSAGE FROM USER */
  const [newMessage, setNewMessage] = useState("");

  //from index.js => state.messenger
  const { friends, message } = useSelector((state) => state.messenger);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  /* OPEN chat with first user that is in Friend List */
  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  /* GET MESSAGES FROM USERS */
  useEffect(() => {
    dispatch(getMessage(currentfriend._id));
    /* IF ANY CURRENT FRIENT => GET ID */
  }, [currentfriend?._id]);

  /* AUTOMATICALLY scroll at the last message in chat */
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  /* INPUT MESSAGES FROM USER */
  const inputMessageHendle = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    //console.log(currentfriend, newMessage);
    const data = {
      senderName: userInfo.username,
      receiverId: currentfriend._id,
      message: newMessage ? newMessage : "❤",
    };
    dispatch(messageSend(data));
  };

  const sendEmojis = (emoji) => {
    setNewMessage(`${newMessage}` + emoji);
  };

  const ImageSend = (image) => {
    try{
      if (image && image.target && image.target.files && image.target.files.length !== 0) {
        const imagename = image.target.files[0].name;
        const newImageName = Date.now() + imagename;
  
        const formData = new FormData();
  
        formData.append("senderName", userInfo.username);
        formData.append("imagename", newImageName);
        formData.append("receiverId", currentfriend._id);
        formData.append("image", image.target.files[0]);
        
        dispatch(imageSend(formData));
      }
    } catch (e) {
      console.log(e);
    }
    
  };

  return (
    <div className="groupComponent">
      {/* LEFT SIDE OF THE CHAT */}
      <LeftGroupComponent
        currentfriend={currentfriend}
        setCurrentFriend={setCurrentFriend}
        userInfo={userInfo}
      />

      {/* RIGHT SIDE OF THE CHAT */}
      {currentfriend ? (
        <RightGroupComponent
          currentfriend={currentfriend}
          setCurrentFriend={setCurrentFriend}
          inputMessageHendle={inputMessageHendle}
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          message={message}
          scrollRef={scrollRef}
          sendEmojis={sendEmojis}
          ImageSend= {ImageSend}
        />
      ) : (
        ""
      )}
    </div>
  );
}
