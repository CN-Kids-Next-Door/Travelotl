/**
 * @module Login
 * @description stateful component that handles login functionality
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import Header from './Header.jsx';

const Login = () => {
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
        body: JSON.stringify({email, password})
      })

      // Check for ok response and redirect back to main
      if (res.ok) {
        const user = await res.json();
        localStorage.setItem('userToken', user.token);
        console.log(user);
        navigate('/');
      }
   };

   return(
    <div>
        {/* <Header /> */}
        <h2>Login</h2>
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
            <button type='submit'>Login</button>
        </form>
    </div>
   );
};

export default Login;