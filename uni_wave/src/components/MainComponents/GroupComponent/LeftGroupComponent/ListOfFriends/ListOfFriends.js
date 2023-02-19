import React, { useEffect, useState } from "react";

import "./ListOfFriends.css";
import "../../GroupComponent.css";

import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from "../../../../../store/actions/messengerAction.js";

export default function ListOfFriends(props) {

  //from index.js => state.messenger
  const { friends } = useSelector((state) => state.messenger);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <div className="friend-list">

        {
          friends && friends.length>0 ? friends.map((friend) =>  
            <div className="friend" key={friend._id} onClick={()=> props.setCurrentFriend(friend)}>
                <div className="friendUserImage">
                <img src={`${friend.image}`} alt="userPicture" />
                </div>
                <div className="userName">{friend.username}</div>
          </div> ) : <div className="userName">No Friends</div>
        }

    </div>
  );
}
