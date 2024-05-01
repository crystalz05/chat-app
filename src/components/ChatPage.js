import React from "react";
import iconBack from "./arrow_14053604.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function ChatPage() {
  const authContext = useAuth();

  const [conversations, setConversations] = useState([]);
  const [participant, setParticipant] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    // const interval = setInterval(() => {
      fetchConversations();
    // }, );
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/conversations");
      const response2 = await axios.get("http://localhost:8080/users")

      const filteredUsers = response2.data.filter((user) => user.id !== authContext.userId);

      // console.log(response.data[authContext.userId].participants);
      // console.log(authContext.userId);
      const filteredConversations = response.data.filter((chat) =>
        chat.participants.some(
          (participant) => participant.id === authContext.userId
        )
      );

      // conversations.forEach(element => {
      //   const allPart = [];
      //   element.participants.forEach(participant =>{
      //     allPart.push(participant)
      //     setParticipant(allPart)
      //   })
      // });



      // console.log(participant);


      setConversations(filteredConversations);
      setUsers(filteredUsers);

      // console.log(conversations.participants);
      // console.log(users);

    } catch (error) {
      console.error("Error fetching users:", error);
    }

  };
  const getParticipantId = (conversation) => {
    // Find the participant whose id is not equal to the specified id
    const participant = conversation.participants.find((participant) => participant.id !== authContext.userId);
    // Return the participant's ID if found, otherwise return null
    // if(participant){
      // setParticipant(participant.userName);
    // }
    return participant ? { id: participant.id, username: participant.userName } : null;  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center w-[400px] h-[600px] rounded-lg border bg-white drop-shadow-lg py-4 px-4">
        <div id="work">
          <h1 className="text-3xl pb-8">Chat list</h1>
        </div>
        <div className="flex flex-col w-full">
          <div>
            {conversations.map((item) => {
              // Find the participant whose id is not equal to the specified id
              const participant = item.participants.find(
                (participant) => participant.id !== authContext.userId
              );
              // Render the participant's username if found, otherwise render a placeholder
              const username = participant
                ? participant.userName
                : "Participant not found";

              return (

                <Link
            
                  to={`/chat/id?id=${parseInt(item.id+""+getParticipantId(item).id)}`}
                  key={item.id}
                  // onClick={() => console.log(getParticipantId(item).id)}           

                  className="h-[70px] w-full cursor-pointer flex items-center border-b border-black/10"
                >
                  <div className="ml-5 text-xl">{getParticipantId(item).username}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-8  w-full">
          <div className="text-green-600 pb-6 border-b-2 text-center">New Chats</div>
          <div className="w-full">
          {users.map((item) => {
            return <div key={item.id} className="h-[70px] w-full cursor-pointer flex items-center border-b border-black/10">
              {item.userName}
            </div>
          })}

          </div>

        </div>
      </div>
    </div>
  );
}

export default ChatPage;
