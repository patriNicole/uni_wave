import React from "react";
import "./MessageSend.css";

import {
  FaPlusCircle,
  FaFileImage,
  FaGift,
  FaPaperPlane,
} from "react-icons/fa";

export default function MessageSend() {
  
  const emojis = [
    '😀', '😃', '😄', '😁',
    '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃',
    '😉', '😌', '😍', '😝',
    '😜', '🧐', '🤓', '😎',
    '😕', '🤑', '🥴', '😱'
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" id='emoji' />
      <div className="iconMessageFile hover-attachment">
        <FaPlusCircle />
      </div>

      <div className="iconMessageFile hover-image">
          <FaFileImage />
      </div>

      <div className="iconMessageFile hover-gift">
        <FaGift />
      </div>

      <div className="message-type">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Aa"
          className="form-control-message-send"
        />

        <div className="iconMessageFile hover-gift">
          <label htmlFor="emoji">
            <FaPaperPlane />
          </label>
        </div>
      </div>

      <div className="iconMessageFile">❤</div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
