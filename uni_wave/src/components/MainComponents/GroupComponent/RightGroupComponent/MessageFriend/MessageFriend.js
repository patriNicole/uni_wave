import React, { useEffect } from "react";
import "./MessageFriend.css";

import { useSelector } from "react-redux";

export default function MessageFriend({ message, currentfriend, scrollRef }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="messageCenter">
      {message && message.length > 0 ? (
        message.map((m) => (
          <div key={m._id}>
            {m.senderId === userInfo.id ? (
              <div className="my-message" ref={scrollRef}>
                <div className="my-image-and-message">
                  <div className="my-message-text">
                    <p className="message-text">{m.message.text}</p>
                  </div>
                </div>
                <div className="time">2 Jan 2022</div>
              </div>
            ) : (
              <div className="friend-message" ref={scrollRef}>
                <div className="friend-image-and-message">
                  <div className="friend-message-image">
                    <img src={`${currentfriend.image}`} alt="userPicture" />
                  </div>
                  <div className="friend-message-time">
                    <div className="friend-message-text">
                      <p className="message-text">{m.message.text}</p>
                    </div>
                    <div className="time">3 Jan 2022</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No messages yet</div>
      )}
    </div>
  );
  
}
