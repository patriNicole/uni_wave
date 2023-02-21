import React from "react";
import "./MessageSend.css";

import {
  FaPlusCircle,
  FaFileImage,
  FaGift
} from "react-icons/fa";

import { BsEmojiSunglasses } from 'react-icons/bs';

export default function MessageSend({ inputMessageHendle, newMessage, sendMessage, sendEmojis, ImageSend }) {
  
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
          <input onChange={ImageSend} type="file" id='pictureSend' className="form-control-message-send" accept="image/*"/>
          <label htmlFor='pictureSend'> <FaFileImage/> </label>
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
          onChange={ inputMessageHendle }
          value ={ newMessage }
        />

        <div className="iconMessageFile hover-gift">
          <label htmlFor="emoji">
            <BsEmojiSunglasses />
          </label>
        </div>
      </div>

      <div className="iconMessageFile" onClick={ sendMessage } >❤</div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e) => (
            <span onClick={()=>sendEmojis(e)} key={e}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
