import React, { useState } from "react";
import send from "./send_4194791.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useAuth } from "./security/AuthContext";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [content, setNewMessage] = useState("");
  const [timestamp, setTimeStamp] = useState(new Date());
  const [participant, setParticipant] = useState("");

  const newMessageRef = useRef(null); // Ref for the input element

  const authContext = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchedId = searchParams.get("id");
  const chatId = searchedId.charAt(0);
  const participantId = searchedId.charAt(1);

  const getParticipant = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/users/id/${participantId}`
      );
      setParticipant(response.data.userName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewMessage = (e) => {
    if (e.target.value !== "") {
      setNewMessage(e.target.value);
    }
  };

  const handleSend = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/messages/${authContext.userId}/${chatId}`,
        {
          content,
          timestamp,
        }
      );
    } catch (error) {
      console.log(error);
    }

    if (newMessageRef.current) {
      newMessageRef.current.value = ""; // Set input value to empty string
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      async function fetchMessages() {
        try {
          const response = await axios.get("http://localhost:8080/messages");
          const filteredMessages = [];

          for (const message of response.data) {
            if (message.conversation.id === parseInt(chatId)) {
              filteredMessages.push(message);
            }
          }
          setMessages(filteredMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
      fetchMessages();
    }, 10); // Fetch messages every second

    return () => clearInterval(interval); // Cleanup function to clear the interval
  }, []);

  const [sender, setSender] = useState("You");

  return (
    <div
      className="flex justify-center items-center h-screen"
      onLoad={getParticipant}
    >
      <div className="flex flex-col items-center w-[400px] h-[600px] rounded-lg border bg-white drop-shadow-lg py-4 px-4">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-lg font-semibold">
            Chatting with {participant}
          </h1>
        </div>
        <div className="flex-grow p-4 overflow-y-auto w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender.id === parseInt(authContext.userId)
                  ? "justify-end"
                  : "justify-start"
              } flex mt-2`}
            >
              <div
                className={`${
                  message.sender.id === parseInt(authContext.userId)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                } px-4 py-2 rounded-lg max-w-[250px]`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between">
          <input
            ref={newMessageRef} // Attach the ref here
            type="text"
            className="flex-grow px-2 py-1 border border-gray-100 rounded-lg focus:outline-none"
            placeholder="Type your message..."
            onChange={handleNewMessage}
          />
          <img
            onClick={handleSend}
            src={send}
            className="w-[40px] h-[40px] cursor-pointer ml-3"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
