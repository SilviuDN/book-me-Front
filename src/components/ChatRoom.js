import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useChat from "../useChat";
import SpinningBook from './RotateBook';
import '../App.css';
function ChatRoom(props) {
    const { roomId } = props.match.params; // Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(""); // Message to be sent

    const [spinningDirection, setDirection] = useState(true)

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
      };

      const [book, setBook] = useState([]);
      useEffect( () => {
        (async function Request() {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${roomId}`
            // `https://www.googleapis.com/books/v1/volumes?q="${roomId}+intitle:keyes"`
            // `https://www.googleapis.com/books/v1/volumes?q="${roomId}"`
            // `https://www.googleapis.com/books/v1/volumes?q=harry`
          );
          // console.log("From the chatRoom:", res.data)
          setBook(res.data);
        })()
      }, [newMessage])


      const changeDirection = () =>{
        const infoUrl = book.volumeInfo.infoLink
        console.log(infoUrl)
        setDirection(!spinningDirection)
        window.open(`${infoUrl}`, "_blank")
        
      }



      return (
        <div className="chat-room-container">
          

        <div onClick={() => changeDirection()}>
          <SpinningBook  spinningDirection={spinningDirection} book={book}/>        
        </div>
        
          <h1 className="room-name">Room: {book.volumeInfo?.title}</h1>
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
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Write message..."
              className='new-message-textarea'
            />
            <button onClick={handleSendMessage} className="send-message-button">
              Send
            </button>
          </div>
        </div>
      );
}
export default ChatRoom
















