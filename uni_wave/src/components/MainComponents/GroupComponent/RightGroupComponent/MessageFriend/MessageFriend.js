import React, { useEffect } from "react";
import "./MessageFriend.css";

import moment from "moment";

import { useSelector } from "react-redux";

import { FaRegCheckCircle } from "react-icons/fa";

export default function MessageFriend({
  message,
  currentfriend,
  scrollRef,
  typingMessage,
}) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="messageCenter">
        {message && message.length > 0
          ? message.map((m, index) => (
              <div key={index}>
                {m.senderId === userInfo.id ? (
                  <div className="my-message" ref={scrollRef}>
                    <div className="my-image-and-message">
                      <div className="my-message-text">
                        <p className="message-text">
                          {" "}
                          {m.message?.text === "" ? (
                            <img src={`${m.message.image}`} />
                          ) : (
                            m.message?.text
                          )}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="time">
                      {moment(m.createdAt).startOf("mini").fromNow()}{" "}
                    </div>
                    {/* INSIDE THE MESSAGE DISPLAY DELIVERED FLAG OR IMAGE IF MESSAGE SEEN */}
                    {index === message.length - 1 &&
                      m.senderId === userInfo.id ? (
                        m.status === "seen" ? (
                          <img
                            className="activeUserCHAT"
                            src={`${currentfriend.image}`}
                            alt="userPicture"
                          />
                        ) : m.status === "delivered" ? (
                          <span className="deliveredMessage">
                            {" "}
                            <FaRegCheckCircle />{" "}
                          </span>
                        ) : (
                          <span>
                            {" "}
                            <FaRegCheckCircle />{" "}
                          </span>
                        )
                      ) : (
                        ""
                    )}
                    {/* ---------------------------------------------------------------------- */}
                  </div>
                ) : (
                  <div className="friend-message" ref={scrollRef}>
                    <div className="friend-image-and-message">
                      <div className="friend-message-image">
                        <img src={`${currentfriend.image}`} alt="userPicture" />
                      </div>
                      <div className="friend-message-time">
                        <div className="friend-message-text">
                          <p className="message-text">
                            {" "}
                            {m.message?.text === "" ? (
                              <img src={`${m.message.image}`} />
                            ) : (
                              m.message?.text
                            )}{" "}
                          </p>
                        </div>
                        <div className="time-friend">
                          {moment(m.createdAt).startOf("mini").fromNow()}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          : null}

        {/* TYPING MESSAGE */}
        {typingMessage &&
        typingMessage.message &&
        typingMessage.senderId === currentfriend._id ? (
          <div className="friend-message-typing">
            <div className="friend-image-and-message">
              <div className="friend-message-image">
                <img src={`${currentfriend.image}`} alt="userPicture" />
              </div>

              <div className="friend-message-text-typing">
                <p className="typing">Typing message ....</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
