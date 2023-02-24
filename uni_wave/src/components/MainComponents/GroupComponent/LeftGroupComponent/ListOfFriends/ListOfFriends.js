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

              {/* ----------------------------- Last Message --------------------------------------- */}
              <div className="time-lastMessage">
                {friend.messageInfo &&
                friend.messageInfo.senderId === props.userInfo ? (
                  <span> You </span>
                ) : (
                  <span> </span>
                )}
                {friend.friendInfo &&
                friend.messageInfo &&
                friend.messageInfo.message &&
                friend.messageInfo.message.text ? (
                  <span>{friend.messageInfo.message.text.slice(0, 7)}</span>
                ) : friend.friendInfo &&
                  friend.messageInfo &&
                  friend.messageInfo.message &&
                  friend.messageInfo.message.image ? (
                  <span> Send A image </span>
                ) : (
                  <span> </span>
                )}
                <span className="time-momento">
                  {friend.messageInfo && friend.messageInfo.createdAt
                    ? " " +
                      moment(friend.messageInfo.createdAt)
                        .startOf("mini")
                        .fromNow()
                    : ""}
                </span>
              </div>
              
              {/* -------------------------------- Seen/Unseen ------------------------------------------ */}

              {friend.messageInfo ? (
              props.userInfo.id === friend.messageInfo?.senderId ? (
                <div className="seen-unseen-icon">
                  <img src={`${friend.friendInfo.image}`} alt="" />
                </div>
              ) : (
                <div className="seen-unseen-icon">
                  <div className="seen-icon"></div>
                </div>
              ) ) :  <span> </span> }

              {/* --------------------------------------------------------------------------------------- */}

            </div>
          </div>
        ))
      ) : (
        <div className="userName">No Friends</div>
      )}
    </div>
  );
}
