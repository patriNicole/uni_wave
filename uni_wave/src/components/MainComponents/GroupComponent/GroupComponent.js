import React, { useState, useEffect } from "react";

import "./GroupComponent.css";
import "../../Main/TopNav/TopNav.css";

import LeftGroupComponent from "./LeftGroupComponent/LeftGroupComponent.js";
import RightGroupComponent from "./RightGroupComponent/RightGroupComponent.js";

import { useDispatch, useSelector } from 'react-redux';
import { getFriends, messageSend } from "../../../store/actions/messengerAction.js";

export default function GroupComponent() {

  /* Used user info as appears (Redux) when logged in in application */
  const {userInfo} = useSelector( state => state.auth );

  /* GET CURRENT FRIEND */
  const [currentfriend, setCurrentFriend] = useState('');

  /* NEW MESSAGE FROM USER */
  const [newMessage, setNewMessage] = useState('');

  //from index.js => state.messenger
  const { friends } = useSelector((state) => state.messenger);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  /* OPEN chat with first user that is in Friend List */
  useEffect(() => {
    if(friends && friends.length > 0) {
      setCurrentFriend(friends[0])
    }
  },[friends]);


  /* INPUT MESSAGES FROM USER */
  const inputMessageHendle = (e) => {
    setNewMessage(e.target.value);
  }

  const sendMessage = (e) => {
      e.preventDefault();
      //console.log(currentfriend, newMessage);
      const data = {
        senderName : userInfo.username,
        receiverId : currentfriend._id,
        message : newMessage ? newMessage : '❤'
      }
      dispatch(messageSend(data));
  }

  return (
    <div className="groupComponent">
      {/* LEFT SIDE OF THE CHAT */}
      <LeftGroupComponent 
        currentfriend={currentfriend} 
        setCurrentFriend={setCurrentFriend}
        userInfo={userInfo}
      />

      {/* RIGHT SIDE OF THE CHAT */}
      {
          currentfriend ?  <RightGroupComponent
          currentfriend={currentfriend}
          setCurrentFriend={setCurrentFriend}
          inputMessageHendle={inputMessageHendle}
          sendMessage={sendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          /> : ''
      }
    </div>
  );
}
