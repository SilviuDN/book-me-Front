import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useChat from "../useChat";
import SpinningBook from "./RotateBook";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ChatRoom(props) {
  const classes = useStyles();

  const { roomId } = props.match.params; // Gets roomId from URL

  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const [spinningDirection, setDirection] = useState(true);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage === "" || newMessage === null) {
      return null;
    }

    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const [book, setBook] = useState([]);
  useEffect(() => {
    (async function Request() {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${roomId}`
      );
      setBook(res.data);
    })();
  }, [newMessage]);

  const changeDirection = () => {
    const infoUrl = book.volumeInfo.infoLink;
    setDirection(!spinningDirection);
    window.open(`${infoUrl}`, "_blank");
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-room-container">
      <div className="bookHome">
        <div className="spinningBook" onClick={() => changeDirection()}>
          <SpinningBook spinningDirection={spinningDirection} book={book} />
        </div>

        <Link
          style={{
            textDecoration: "none",
          }}
          to={`/`}
        >
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            style={{ backgroundColor: "#03989e" }}
            // endIcon={<Icon>send</Icon>}
          >
            Home
          </Button>
        </Link>
      </div>
      <hr style={{ marginTop: "2em" }} />
      <div
        style={{
          fontSize: book.volumeInfo?.title.length > 24 ? "0.8em" : "1.5em",
        }}
        className="titleChat"
      >
        <h1 className="room-name">{book.volumeInfo?.title}</h1>
      </div>

      {/* <div className="messages-container"> */}
      <ol className="messages-list">
        {messages.map((message, i) => (
          <li
            key={i}
            className={`message-item ${
              message.ownedByCurrentUser ? "my-message" : "received-message"
            }`}
          >
            {message.body}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ol>
      {/* </div> */}
      <div className="new-message-input-field">
        {/* <input
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
              className='new-message-textarea'
            /> */}

        <TextField
          id="outlined-search"
          label="Menssage"
          variant="outlined"
          onChange={handleNewMessageChange}
          onKeyDown={handleKeyDown}
          value={newMessage}
          type="text"
          style={{ width: "80%" }}
          inputProps={{
            maxLength: 144,
          }}
        />
        {/* <button onClick={handleSendMessage} className="send-message-button">
              Send
            </button> */}

        <Button
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          className={classes.button}
          id="btnRoomChat"
          style={{ backgroundColor: "#03989e" }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
export default ChatRoom;
