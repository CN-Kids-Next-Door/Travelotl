/**
 * @module Login
 * @description stateful component that handles login functionality
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/Travelotl_Logo.png';


// import Header from './Header.jsx';
const Login = ({ toggle }) => {
    // Initialize empty state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Needed to navigate to different pathways
    const navigate = useNavigate();

    /* handleSubmit: asynchoronous event handling function
      - handles the submission of the login form
      - makes a POST request to the server with inputted email and password
      - stores a user token in local storage, then navigates back to main page
    */
   const handleSubmit = async (e) => {
      e.preventDefault();

      // Make fetch request with submitted data
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userInfo: {email, password}})
      })

      // Check for ok response and redirect back to main
      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('userToken', user.token);
        console.log(user);
        navigate('/');
      } else {
        console.error('Failed to login');
      }
   };
   const CLIENT_ID = "fb26bcfe259d6f2f503c"

   useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const codeParams = urlParams.get("code")
    console.log(codeParams)

    if(codeParams && localStorage.getItem("accessToken") === null){
      async function getAccessToken () {
        await fetch("http://localhost:8080/successlogin?code="+ codeParams, {
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          console.log(data)
          if(data.access_token){
            localStorage.setItem("accessToken", data.access_token)
          }
        })

      }
      getAccessToken()
    }
   }, [])

    function logIn () {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
    }

   return(
    <div className="min-h-screen flex justify-center  items-center">
      <img src={Logo} style={{height: '200px', width: '300px', position : 'absolute', left: '10%', top: '1%', zIndex: '3', transform: 'translateX(-50%)'   }} alt= 'Travolotl Logo'/>  
      
      <header className="flex items-center justify-center h-screen overflow-hidden" />
      

        
      <div style={{position : 'absolute', left: '20%', top: '50%', zIndex: '3', transform: 'translateX(-50%)'   }}>
        <h2 className="text-3xl font-semibold text-center text-gray mt-[-50px] mb-8">
          Login
        </h2>
        {/* <Header /> */}
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='codesmith@test.com'/>
            </label>
            <br />
            <label>
                Password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Not 1234'/>
            </label>
            <br />
            <button type="submit">
              Login
            </button>

            <button onClick = {logIn}>
              Login Through Github
            </button>

        </form>

        <button 
          type="button" 
          onClick={toggle}>
          Go to Signup Page
        </button>

    </div>
    </div>
   );
};
//add a button that sends the code and state to the backend
//create a seperate folder named oauth
//import methods of oauth here
export default Login;