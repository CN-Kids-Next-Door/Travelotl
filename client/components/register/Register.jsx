import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/Travelotl_Logo.png';
import { useRegisterMutation, useOauthMutation } from './../../features/authSlice.js';

const Register = ({ toggle }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, firstName, lastName, email, password }).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: 'url(path_to_your_image.jpg)' }}>

      <div className="absolute left-[70%] top-[55%] -translate-x-1/2 z-30 transform -translate-y-1/2 rotate-[5.7deg]">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">
              Username:
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}
                     placeholder='Username' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block mb-2">
              First Name:
              <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}
                     placeholder='First Name' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block mb-2">
              Last Name:
              <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}
                     placeholder='Last Name' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block mb-2">
              Email:
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                     placeholder='Email' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block mb-2">
              Password:
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                     placeholder='Password' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <button type="submit" disabled={isLoading}
              className={`btn btn-primary w-full max-w-xs ${isLoading ? 'loading' : ''} transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg outline outline-2 outline-blue-500`}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {isError && <p className="text-red-500">Error: {error?.data?.message || 'Registration failed'}</p>}
          </div>
          <button type="button" onClick={toggle}
                  className="btn btn-link w-full max-w-xs mt-4 underline text-blue-500 hover:text-blue-700 focus:outline-none rounded-lg outline outline-2 outline-blue-500">
            Already have an account? Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
