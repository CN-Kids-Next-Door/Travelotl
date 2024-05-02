/**
 * @module Register
 * @description stateful component that handles registering a new user
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/Travelotl_Logo.png';

// import Header from './Header.jsx';

const Register = ({ toggle }) => {
  // Initialize empty state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
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
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          userInfo: {
              firstName,
              lastName,
              username,
              email,
              password,
          },
      })
    })
    // Check for ok response and redirect back to login
    if (res.ok) {
      // const user = await res.json();
      // console.log(user);
      navigate('/login');
    }
  };
  const CLIENT_ID = "fb26bcfe259d6f2f503c"

  function logIn () {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID)
  }

  return(
    <div className="min-h-screen flex justify-center items-center">
            <img src={Logo} style={{height: '200px', width: '300px', position : 'absolute', left: '10%', top: '1%', zIndex: '3', transform: 'translateX(-50%)' }} alt='Travelotl Logo'/>
            <header className="flex items-center justify-center h-screen overflow-hidden" />

            <div style={{position : 'absolute', left: '20%', top: '50%', zIndex: '3', transform: 'translateX(-50%)'}}>
                <h2 className="text-3xl font-semibold text-center text-gray mt-[-50px] mb-8">
                    Register
                </h2>
                <form id='registerForm' onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input 
                            type='text' 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder='Codename'
                        />
                    </label>
                    <br/>
                    <label>
                        Last Name:
                        <input 
                            type='text' 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder='Kids Next Door'
                        />
                    </label>
                    <br/>
                    <label>
                        Username:
                        <input 
                            type='text' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder='CN: KND'
                        />
                    </label>
                    <br/>
                    <label>
                        Email:
                        <input 
                            type='email' 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                            placeholder='codesmith@test.com'
                        />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input 
                            type='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Not 1234'
                        />
                    </label>
                    <br/>

                    <button type="submit">
                        Register / Signup
                    </button>

                </form>
                <button 
                  type="button" 
                  onClick={ toggle }
                >
                  Go to Login Page
                </button>
            </div>
        </div>
    );
};

export default Register;