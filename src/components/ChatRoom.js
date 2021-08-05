import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useChat from "../useChat";
import SpinningBook from "./RotateBook";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
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
            // endIcon={<Icon>send</Icon>}
          >
            Home
          </Button>
        </Link>
      </div>

      <div className="titleChat">
        <h1 className="room-name">{book.volumeInfo?.title}</h1>
      </div>

      <div className="messages-container">
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
        </ol>
      </div>
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
          onClick={handleSendMessage}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
export default ChatRoom;
