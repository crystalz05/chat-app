import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { getConversation, getUsers, apiClient } from "./api/ApiClient";

function ChatPage() {
  const authContext = useAuth();

  const [conversations, setConversations] = useState([]);
  const [exisitingParticipant, setExisitingParticipant] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentId1, setCurrentId1] = useState();
  const [currentId2, setCurrentId2] = useState();

  useEffect(() => {
    const fetchConversationsAndUsers = async () => {
      try {
        const [conversationResponse, usersResponse] = await Promise.all([
          getConversation(authContext.token),
          getUsers(authContext.token),
        ]);

        const filteredUsers = usersResponse.data.filter(
          (user) => user.id !== authContext.userId
        );

        const filteredConversations = conversationResponse.data.filter((chat) =>
          chat.participants.some(
            (participant) => participant.id === authContext.userId
          )
        );

        setConversations(filteredConversations);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching conversations and users:", error);
      }
    };

    fetchConversationsAndUsers();
  }, [authContext.token, authContext.userId]);

  useEffect(() => {
    const extras = users.filter((user) => {
      return !conversations.some((conversation) =>
        conversation.participants.some(
          (participant) => participant.id === user.id
        )
      );
    });
    setExisitingParticipant(extras);
  }, [users, conversations]);

  const getParticipantId = (conversation) => {
    const participant = conversation.participants.find(
      (participant) => participant.id !== authContext.userId
    );

    return participant
      ? { id: participant.id, username: participant.userName }
      : null;
  };

  const handleNewChatClick = async () => {
    try {
      await apiClient.post(`/conversations/${currentId1}/${currentId2}`, {});
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center w-[400px] h-[600px] rounded-lg border bg-white drop-shadow-lg py-4 px-4">
        <div id="work">
          <h1 className="text-3xl pb-8">Chat list</h1>
        </div>
        <div className=" w-full h-[600px] overflow-y-auto">
        <div className="flex flex-col w-full overflow-y-auto ">
          <div>
            {conversations.map((item) => {
              const participant = item.participants.find(
                (participant) => participant.id !== authContext.userId
              );
              const username = participant
                ? participant.userName
                : "Participant not found";

              return (
                <Link
                  to={`/chat/id?id=${parseInt(
                    item.id + "" + getParticipantId(item).id
                  )}`}
                  key={item.id}
                  className="h-[70px] w-full cursor-pointer flex items-center border-b border-black/10"
                >
                  <div className="ml-5 text-xl">
                    {getParticipantId(item).username}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-8 w-full">
          <div className="text-green-600 pb-6 border-b-2 text-center">
            New Chats
          </div>
          <div className="w-full">
            {exisitingParticipant.map((item) => (
              <Link
                to={`/chat/id?id=${parseInt(currentId1 + "" + currentId2)}`}
                key={item.id}
              >
                <div
                  onMouseEnter={() => {
                    setCurrentId2(item.id);
                    setCurrentId1(authContext.userId);
                  }}
                  onClick={handleNewChatClick}
                  className="h-[70px] w-full mb-3 cursor-pointer flex items-center border-b bg-black/5 border-black/10"
                >
                  <div className="ml-5">{item.userName}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>          
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
