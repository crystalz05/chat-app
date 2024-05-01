import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  // Fetch users, conversations, and messages on component mount
  useEffect(() => {
    fetchUsers();
    fetchConversations();
    fetchMessages();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  console.log(messages.length > 1 ? messages[1].conversation : 'No user found');


  return (
    <div>
      <h1 className='text-2xl font-bold'>Chat Application</h1>

      <h2 className='xl'>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul>

      <h2>Conversations</h2>
      <ul>
        {conversations.map(conversation => (
          <li key={conversation.id}>{conversation.name}</li>
        ))}
      </ul>

      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.conversation.id +" "+message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatApp;
