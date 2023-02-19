import React, { useState, useEffect } from "react";

import "./GroupComponent.css";
import "../../Main/TopNav/TopNav.css";

import LeftGroupComponent from "./LeftGroupComponent/LeftGroupComponent.js";
import RightGroupComponent from "./RightGroupComponent/RightGroupComponent.js";

import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from "../../../store/actions/messengerAction.js";

export default function GroupComponent() {

  const [currentfriend, setCurrentFriend] = useState('');

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

  return (
    <div className="groupComponent">
      {/* LEFT SIDE OF THE CHAT */}
      <LeftGroupComponent currentfriend={currentfriend} setCurrentFriend={setCurrentFriend}/>

      {/* RIGHT SIDE OF THE CHAT */}
      {
          currentfriend ?  <RightGroupComponent
          currentfriend={currentfriend}
          setCurrentFriend={setCurrentFriend}
          /> : ''
      }
    </div>
  );
}
