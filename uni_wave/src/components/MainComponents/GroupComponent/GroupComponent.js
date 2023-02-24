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
  imageSend,
  imageSendDispach,
} from "../../../store/actions/messengerAction.js";

import { io } from "socket.io-client";

// Message Notification
import toast from "react-hot-toast";

// Sound Notification
import useSound from 'use-sound';
import notificationSound from "./audio/notification.mp3";
import sendMessageSound from "./audio/send-message.mp3";

export default function GroupComponent() {
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);

  /* GET CURRENT FRIEND */
  const [currentfriend, setCurrentFriend] = useState("");

  /* NEW MESSAGE FROM USER */
  const [newMessage, setNewMessage] = useState("");

  //from index.js => state.messenger
  const { friends, message } = useSelector((state) => state.messenger);

  /* --------------------------------------- SOCKET --------------------------------------- */
  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  // Notification Sounds
  const [notificationPlay] = useSound(notificationSound);   
  const [sendingMessagePlay] = useSound(sendMessageSound);  

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
    // Geat all the data to socket message
    socket.current.on("patiMessage", (data) => {
      // User 2 will get all the data when User 1 will send a message
      // Load all the data from socket into socketMessage
      console.log(data);
      setSocketMessage(data);
    });
    // Typing Socket
    socket.current.on("getTypingMessage", (data) => {
      setTypingMessage(data);
      //console.log(data);
    });
  }, []);

  useEffect(() => {
    // If there is a socketMessage and a current friend active
    if (socketMessage && currentfriend) {
      if (
        socketMessage.senderId === currentfriend._id &&
        // If receiverId equal with user logged in
        socketMessage.receiverId === userInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    // Emit an event with the name addUser and two arguments
    socket.current.emit("addUser", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    // Get the users list from socket.js using 'getUser' method coming from there.
    socket.current.on("getUser", (users) => {
      //console.log(users)
      const filterUser = users.filter(
        (userData) => userData.userId !== userInfo.id
      );
      setActiveUser(filterUser);
    });
  }, []);

  useEffect(() => {
    if(socketMessage && socketMessage.receiverId === userInfo.id){
      notificationPlay();
      // Toaster is found in TopNav.js, where the message will be displayed.
      toast.success(`${socketMessage.senderName} send a New Message`)
    }
  },[socketMessage]);
  /* -------------------------------------------------------------------------------------- */

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  /* ------------------------------------ OPEN chat with first user that is in Friend List --------------------------------- */
  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0].friendInfo);
    }
  }, [friends]);

  /* --------------------------------------- GET MESSAGES FROM USERS --------------------------------------- */
  useEffect(() => {
    dispatch(getMessage(currentfriend._id));
    /* IF ANY CURRENT FRIENT => GET ID */
  }, [currentfriend?._id]);

  /* --------------------------------------- AUTOMATICALLY scroll at the last message in chat --------------------------------------- */
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  /* --------------------------------------- INPUT MESSAGES FROM USER --------------------------------------- */
  const inputMessageHendle = (e) => {
    setNewMessage(e.target.value);
    // When new message set, set the typing state
    // Pass the e.target.value to socket
    socket.current.emit("typingMessage", {
      senderId: userInfo.id,
      receiverId: currentfriend._id,
      message: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // Send Message Sound
    sendingMessagePlay();
    //console.log(currentfriend, newMessage);
    const data = {
      senderName: userInfo.username,
      receiverId: currentfriend._id,
      message: newMessage ? newMessage : "❤",
    };

    /* BEFORE ADD TO DB send to socket so that the message will be displayed automatically 
    for both users. */
    socket.current.emit("sendMessage", {
      senderId: userInfo.id,
      senderName: userInfo.username,
      receiverId: currentfriend._id,
      time: new Date(),
      message: {
        text: newMessage ? newMessage : "❤",
        image: "",
      },
    });

    // Once message sent, typing resets to empty
    socket.current.emit("typingMessage", {
      senderId: userInfo.id,
      receiverId: currentfriend._id,
      message: "",
    });

    dispatch(messageSend(data));

    // Set socket new message back to empty after upload to db
    setNewMessage("");
  };

  const sendEmojis = (emoji) => {
    setNewMessage(`${newMessage}` + emoji);
    /* When typing show User Typing ... */
    socket.current.emit("typingMessage", {
      senderId: userInfo.id,
      receiverId: currentfriend._id,
      message: emoji,
    });
  };

  const ImageSend = async (image) => {
    try {
      if (
        image &&
        image.target &&
        image.target.files &&
        image.target.files.length !== 0
      ) {
        // Send Image Notification
        sendingMessagePlay();

        const imagename = image.target.files[0].name;
        const newImageName = Date.now() + imagename;

        const formData = new FormData();

        formData.append("senderName", userInfo.username);
        formData.append("imagename", newImageName);
        formData.append("receiverId", currentfriend._id);
        formData.append("image", image.target.files[0]);

        dispatch(imageSendDispach(formData));

        // Get the Message containing the url of the image and not just the name
        // So that it will be possible to display to the other user the image right away
        const resp = await imageSend(formData);

        socket.current.emit("sendMessage", {
          senderId: userInfo.id,
          senderName: userInfo.username,
          receiverId: currentfriend._id,
          time: new Date(),
          message: {
            text: "",
            image: resp.message.image,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="groupComponent">
        {/* --------------------------------------- LEFT SIDE OF THE CHAT --------------------------------------- */}
        <LeftGroupComponent
          currentfriend={currentfriend}
          setCurrentFriend={setCurrentFriend}
          userInfo={userInfo}
          activeUser={activeUser}
        />

        {/* --------------------------------------- RIGHT SIDE OF THE CHAT --------------------------------------- */}
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
            ImageSend={ImageSend}
            activeUser={activeUser}
            typingMessage={typingMessage}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
