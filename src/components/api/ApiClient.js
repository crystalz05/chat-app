import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

// export const executeBasicAuthenticationService 
// = (token) => apiClient.get('/basicauth', {
//     headers:{
//         Authorization: token
//     }
// }); 

export const executeJwtAuthenticationService 
= (username, password) => apiClient.post('/authenticate', 
{username, password})


// export const getConversation 
// = (token) => apiClient.get('/conversations');


// export const getUsers
// =(token) => apiClient.get('/users');

// export const getUserById 
// = (token, participantId) => apiClient.get(
//     `/users/id/${participantId}`);


// export const getMessages 
// = (token) => apiClient.get('/messages');


// export const sendMessage
// = (token, userId, chatId, timestamp, content) => apiClient.post(
//     `/messages/${userId}/${chatId}`,
//     {
//       content,
//       timestamp,
//     });


// version with headers inputed



export const getConversation 
= (token) => apiClient.get('/conversations');

export const createUser 
= (userName, email, password) => apiClient.post('/create/users', 
{userName, email, password})


export const getUsers
=(token) => apiClient.get('/users');

export const getUserById 
= (token, participantId) => apiClient.get(
    `/users/id/${participantId}`,{
        headers:{
            Authorization: token
        }
    });


export const getMessages 
= (token) => apiClient.get('/messages')


export const sendMessage
= (token, userId, chatId, timestamp, content) => apiClient.post(
    `/messages/${userId}/${chatId}`,
    {
      content,
      timestamp,
    });