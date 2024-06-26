import React, { useState, useRef, useEffect } from "react";
import send from "./send_4194791.png";
import { useLocation } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { getMessages, getUserById, sendMessage } from "./api/ApiClient";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [content, setNewMessage] = useState("");
  const [participant, setParticipant] = useState("");

  const newMessageRef = useRef(null); // Ref for the input element

  const authContext = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchedId = searchParams.get("id");
  const chatId = searchedId.charAt(0);
  const participantId = searchedId.charAt(1);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(authContext.token);
      const filteredMessages = response.data.filter(
        (message) => message.conversation.id === parseInt(chatId)
      );
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchParticipant = async () => {
    try {
      const response = await getUserById(authContext.token, participantId);
      setParticipant(response.data.userName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchParticipant();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    try {
      await sendMessage(authContext.token, authContext.userId, chatId, new Date(), content);
      await fetchMessages(); // Fetch messages again after sending a new one
      setNewMessage(""); // Clear the input field
      if (newMessageRef.current) {
        newMessageRef.current.value = ""; // Clear the input field visually
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center w-[400px] h-[600px] rounded-lg border bg-white drop-shadow-lg py-4 px-4">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-lg font-semibold">Chatting with {participant}</h1>
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
