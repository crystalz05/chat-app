// AuthContext.js
import { createContext, useContext, useState } from "react";
import { apiClient, executeBasicAuthenticationService, executeJwtAuthenticationService } from "../api/ApiClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  

  const handleLoginSuccess = (userId) => {
    setUserId(userId);
    setIsAuthenticated(true);
  };

  // const login = async (email, password) => {
    
  //   try{

  //     //enable basic authentication
  //     const baToken = 'Basic ' +window.btoa(email +":"+password)
  //     const response = await executeBasicAuthenticationService(baToken)
  
  //     if(response.status === 200){

  //       // apiClient.interceptors.request.use(
  //       //   (config) => {
  //       //     // console.log('Intercepting and adding token')
  //       //     config.headers.Authorization = baToken;
  //       //     return config;
  //       //   }
  //       // )

  //       //enable setAuthentication
  //       const response2 = await apiClient.get(`/users/${email}`, {
  //         headers:{
  //           Authorization: baToken
  //       }
  //       });
  //       const userId = response2.data.id;
  //       handleLoginSuccess(userId);
  //       setToken(baToken);

  //       return { success: true };
  //     }
  //   }catch(error){
  //     logout();
  //   }

  const login = async (email, password) => {
    
    try{

      //enable jwt authentication
      const response = await executeJwtAuthenticationService(email, password)

      const jwtToken = response.data.token

      if(response.status === 200){
        setToken("Bearer "+jwtToken);

        console.log("token generated")

        apiClient.interceptors.request.use(
          (config) => {
            // console.log('Intercepting and adding token')
            config.headers.Authorization = `Bearer ${jwtToken}`;
            return config;
          }
        )

        //enable setAuthentication
        const response2 = await apiClient.get(`/users/${email}`);
        console.log(response2)

        const userId = response2.data.id;
        handleLoginSuccess(userId);

        return { success: true };
      }
    }catch(error){
      // console.log(error)
      logout();
    }

    // try {
    //   const response = await apiClient.post("/login", {
    //     email,
    //     password,
    //   });

    //   const response2 = await apiClient.get(`/users/${email}`);
    //   const userId = response2.data.id;
    //   handleLoginSuccess(userId);
    //   console.log("successful")
    //   return { success: true };
    // } catch (error) {
    //   console.log("failed")
    //   return { success: false };
    // }
  };

  const logout = () => {
    setUserId(null)
    setIsAuthenticated(false);
    return {success: false}
  };

  return (
    <AuthContext.Provider
      value={{ userId, isAuthenticated, handleLoginSuccess, logout, login, token}}
    >
      {children}
    </AuthContext.Provider>
  );
}
