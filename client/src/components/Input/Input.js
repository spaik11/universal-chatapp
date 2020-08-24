import React, { useEffect } from "react";
import mic from "../../icons/mic.png";
import "./Input.css";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

export default function Input({ setMessage, sendMessage, message, user }) {
  const voiceCommands = () => {
    recognition.onstart = () => {
      console.log("Voice is activated");
    };

    recognition.lang = user.lang;

    recognition.onresult = (event) => {
      const current = event.resultIndex;

      const voiceTranscript = event.results[current][0].transcript;
      setMessage(voiceTranscript);
      console.log(voiceTranscript);
    };
  };

  useEffect(() => {
    voiceCommands();
  });

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          return recognition.start();
        }}>
        <img className="mic" src={mic} alt="mic" />
      </button>
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
}
