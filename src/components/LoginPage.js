// LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import axios from "axios";
import SignUp from "./SignUp";

function LoginPage() {
  const authContext = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      const response2 = await axios.get(`http://localhost:8080/users/${email}`);
      const userId = response2.data.id;
      authContext.handleLoginSuccess(userId); 
      setError("");
      navigateToChat();
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const navigateToChat = () => {
    navigate("/chat");
  };

  const [showLogin, setShowLogin] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignup = () =>{
    if(!showSignUp){
      setShowSignUp(true);
      setShowLogin(false);
    }
  }
  
  const toggleSignIn = () =>{
    if(!showLogin){
      setShowSignUp(false);
      setShowLogin(true);
    } 
  }



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center w-[400px] h-[600px] rounded-lg border bg-white drop-shadow-lg ">
        <div className="absolute top-3 flex justify-center w-full "> 
        <div onClick={toggleSignIn} className={` ${showLogin ? 'bg-yellow-300' : 'bg-white'} w-[100px] text-center py-4 cursor-pointer hover:bg-yellow-100`}>Login</div>
        <div onClick={toggleSignup} className={` ${showSignUp ? 'bg-yellow-300' : 'bg-white'} w-[100px] text-center  py-4 cursor-pointer hover:bg-yellow-100`}>Sign Up</div>
        </div>

        {showLogin && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[300px] h-[300px]">
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
        )}
        {showSignUp && <SignUp/>}
      </div>
    </div>
  );
}

export default LoginPage;
