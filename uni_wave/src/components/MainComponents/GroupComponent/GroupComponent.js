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
  seenMessage,
  deliverMessage,
} from "../../../store/actions/messengerAction.js";

import { io } from "socket.io-client";

// Message Notification
import toast from "react-hot-toast";

// Sound Notification
import useSound from "use-sound";
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
  // from messageReducer.js we have the messengerState constant
  const { friends, message, messageSentSuccessfully, message_get_success } =
    useSelector((state) => state.messenger);

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
      //console.log(data);
      setSocketMessage(data);
    });
    // Typing Socket
    socket.current.on("getTypingMessage", (data) => {
      setTypingMessage(data);
      //console.log(data);
    });
    // Seen Socket - the function called in socket
    socket.current.on("messageSeenResponse", (message) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          messageInfo: message,
        },
      });
    });
    // Deliver Socket - the function called in socket
    socket.current.on("messageDelivaredResponse", (message) => {
      dispatch({
        type: "DELIVERED_MESSAGE",
        payload: {
          messageInfo: message,
        },
      });
    });
    // Seen Successfully After Delivered - the function called in socket
    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
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
        // MESSAGE SEEN -> THEN DISPLAY ICON - go to messageAction
        dispatch(seenMessage(socketMessage));
        // Pass socket Message into socket into function messageSeen
        socket.current.emit("messageSeen", socketMessage);
        // GET LAST MESSAGE ON LEFT CHAT for the receiver Friend
        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            // GET LAST SEND MESSAGE DATA
            messageInfo: socketMessage,
            status: "seen",
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
    if (socketMessage && socketMessage.receiverId === userInfo.id) {
      notificationPlay();
      // Toaster is found in TopNav.js, where the message will be displayed.
      toast.success(`${socketMessage.senderName} send a New Message`);
    }
    if (
      socketMessage &&
      socketMessage.senderId !== currentfriend._id &&
      socketMessage.receiverId === userInfo.id
    ) {
      // MESSAGE DELIVERED - go to messageAction
      dispatch(deliverMessage(socketMessage));
      // Pass socket Message into socket into function delivaredMessage
      socket.current.emit("delivaredMessage", socketMessage);
      // GET LAST MESSAGE ON LEFT CHAT for the receiver Friend
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          // GET LAST SEND MESSAGE DATA
          messageInfo: socketMessage,
          status: "delivered",
        },
      });
    }
  }, [socketMessage]);
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
    //if (friends.length > 0) {}
  }, [currentfriend?._id]);

  /* --------------------------------------- FROM DELIVERED TO SEEN MESSAGE --------------------------------------- */
  useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== userInfo.id &&
        message[message.length - 1].status !== "seen"
      ) {

        dispatch({
          type: "UPDATE",
          payload: {
            id: currentfriend._id,
          },
        });

        socket.current.emit("seenMessageAfterDeliver", {
          senderId: currentfriend._id,
          receiverId: userInfo.id,
        });
        // Our id will be the last message id
        dispatch(seenMessage({ _id: message[message.length - 1]._id }));
      }
    }
    dispatch({
      type: "MESSAGE_GET_SUCCESS_CLEAR",
    });
  }, [message_get_success]);

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

  /* GET LAST MESSAGE - SEEN/UNSEEN */
  useEffect(() => {
    if (messageSentSuccessfully) {
      socket.current.emit(
        "sendMessage",
        // GET LAST SEND MESSAGE DATA
        message[message.length - 1]
      );
      // Update Last Message On Left Component for the sender friend
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          // GET LAST SEND MESSAGE DATA
          messageInfo: message[message.length - 1],
        },
      });
      // Once the message sent, clear the state
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
    // In order for our real-time communication to take place
  }, [messageSentSuccessfully]);
  /* -------------------------------- */

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
        //const resp = await imageSend(formData);

        await socket.current.emit("sendMessage", {
          senderId: userInfo.id,
          senderName: userInfo.username,
          receiverId: currentfriend._id,
          time: new Date(),
          message: {
            text: "",
            image: newImageName,
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
