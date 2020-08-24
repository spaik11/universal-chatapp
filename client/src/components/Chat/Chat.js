import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { set_Name, set_Room } from "../redux/Redux-actions/joinActions";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ user, location, history }) => {
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const END_POINT = "localhost:3001";

  useEffect(() => {
    socket = io(END_POINT);

    if (!user.name) {
      history.push("/");
    }
    let name = user.name;
    let room = user.room;
    let lang = user.lang;

    socket.emit("join", { name, room, lang }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });
  }, [END_POINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log("REDUX", user);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={user.room} />
        <Messages messages={messages} name={user.name} lang={user.lang} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          user={user}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.join,
});

export default connect(mapStateToProps, { set_Name, set_Room })(Chat);
