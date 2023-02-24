import React, { useEffect, useState } from "react";

import moment from "moment";

import "./ListOfFriends.css";
import "../../GroupComponent.css";

import { useDispatch, useSelector } from "react-redux";
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
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <div
            className={
              props.currentfriend._id === friend.friendInfo._id
                ? "active"
                : "friend"
            }
            key={friend.friendInfo._id}
            onClick={() => props.setCurrentFriend(friend.friendInfo)}
          >
            <div className="friendUserImage">
              <img src={`${friend.friendInfo.image}`} alt="userPicture" />
            </div>
            <div className="userName">
              {friend.friendInfo.username}


              <div className="time">
                {friend.messageInfo &&
                friend.messageInfo.senderId === props.userInfo ? (
                  <span>You </span>
                ) : (
                  <span> {friend.friendInfo.username + " "} </span>
                )}
                {friend.friendInfo &&
                friend.messageInfo &&
                friend.messageInfo.message &&
                friend.messageInfo.message.text ? (
                  <span>{friend.messageInfo.message.text.slice(0, 10)}</span>
                ) : friend.friendInfo &&
                  friend.messageInfo &&
                  friend.messageInfo.message &&
                  friend.messageInfo.message.image ? (
                  <span>Send A image </span>
                ) : (
                  <span>Connect You </span>
                )}
                <span>
                  {friend.messageInfo && friend.messageInfo.createdAt
                    ? moment(friend.messageInfo.createdAt)
                        .startOf("mini")
                        .fromNow()
                    : moment().startOf("mini").fromNow()}
                </span>
              </div>


            </div>
          </div>
        ))
      ) : (
        <div className="userName">No Friends</div>
      )}
    </div>
  );
}
