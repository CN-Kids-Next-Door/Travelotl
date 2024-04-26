/**
 * @module Register
 * @description stateful component that handles registering a new user
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header.jsx';

const Register = () => {
    // Initialize empty state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Needed to navigate to different pathways
    const navigate = useNavigate();

    /* handleSubmit: asynchoronous event handling function
      - handles the submission of the registration form
      - makes a POST request to the server with inputted name, email, and password
      - navigates back to login page
    */
   const handleSubmit = async (e) => {
      e.preventDefault();
      // Make fetch request with submitted data
      const res = await fetch('/api/users/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName,
            lastName,
            username: email,
            password
        })
      })
      // Check for ok response and redirect back to login
      console.log(res)
      if (res.ok) {
        //const user = await res.json();
        //console.log(user);
        navigate('/login');
      }
   };

   return(
    <div>
        <Header />
        <h2>Register</h2>
        <form id='registerForm' onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Codename'/>
            </label>
            <br />
            <label>
                Last Name:
                <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Kids Next Door'/>
            </label>
            <br />
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
            <button type='submit'>Register</button>
        </form>
    </div>
   );
};

export default Register;