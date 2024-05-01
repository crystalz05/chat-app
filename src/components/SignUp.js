import axios from "axios";
import React, { useState } from "react";

function SignUp() {


    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) =>{
        setPassword(e.target.value);
    }

    const handleRepeatedPasswordChange = (e) =>{
        setRepeatPassword(e.target.value);
    }

    const handleSubmit = async (e) =>{
        if(password === repeatPassword){
            e.preventDefault();
            try {
                const response = await axios.post("http://localhost:8080/users",
                {userName, email, password}
                );

            }catch (error) {
                setError("User already exist, try changing email or username")
            }
        }else{
            setError("passwords do not match")
        }
    }


    // const handleSubmit2 = async (event) => {
    //     event.preventDefault();
    //     try {
    //       const response = await axios.post("http://localhost:8080/login", {
    //         email,
    //         password,
    //       });
    //       const response2 = await axios.get(`http://localhost:8080/users/${email}`);
    //       const userId = response2.data.id;
    //       authContext.handleLoginSuccess(userId); 
    //       setError("");
    //       navigateToChat();
    //     } catch (error) {
    //       setError("Invalid username or password");
    //     }
    //   };








  return (
    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[300px] h-[400px]">
      {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
          </label>
          <input required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
          </label>
          <input required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            
          </label>
          <input required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            
          </label>
          <input required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={handleRepeatedPasswordChange}
          />
        </div>
        <div className="flex items-center justify-end ">
          <button
            className="bg-black w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Creat Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
