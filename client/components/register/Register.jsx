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
      await register({
        userInfo: { username, firstName, lastName, email, password }}).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
  function handlePasswordVisibility() {
    if(document.getElementById('password').getAttribute('type') === 'password') {
      document.getElementById('password').setAttribute('type', 'text');
      document.getElementById('passwordImage').setAttribute('src', 'https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png')
    } else {
      document.getElementById('password').setAttribute('type', 'password');
      document.getElementById('passwordImage').setAttribute('src', 'https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png')
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: 'url(path_to_your_image.jpg)' }}>

<img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[10%] top-[1rem] z-30 -translate-x-1/2" />

      <div className="absolute left-[65%] top-[55%] -translate-x-1/2 z-30 transform -translate-y-1/2 rotate-[5.7deg]">
        <h2 style={{textShadow: 
              '2px 0 0 white, 0 2px 0 white, -2px 0 0 white, 0 -2px 0 white' }} 
              className="relative top-[1em] text-3xl font-semibold font-montserrat text-center text-gray-700 mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-montserrat mb-2">
              Username:
              <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}
                     placeholder='Username' className="input input-bordered w-full font-montserrat max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block font-montserrat mb-2">
              First Name:
              <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}
                     placeholder='First Name' className="input input-bordered w-full font-montserrat max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block font-montserrat mb-2">
              Last Name:
              <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}
                     placeholder='Last Name' className="input input-bordered w-full font-montserrat max-w-xs rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block font-montserrat mb-2">
              Email:
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                     placeholder='codesmith@test.com' className="input input-bordered w-full max-w-xs font-montserrat rounded-lg outline outline-2 outline-blue-500"/>
            </label>
            <label className="block font-montserrat mb-2">
              Password:
              <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                     placeholder='Not 1234' className="input input-bordered w-full font-montserrat max-w-xs rounded-lg outline outline-2 outline-blue-500"
                     />
                       <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' className='h-5 w-5 inline-block ml-[90%] mt-[-20.75%]' onClick={handlePasswordVisibility}/>
            </label>
            <button type="submit" disabled={isLoading}
              className={`btn btn-primary w-full max-w-xs ${isLoading ? 'loading' : ''} transition duration-150 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-montserrat focus:ring-opacity-50 rounded-lg outline outline-2 outline-blue-500`}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {isError && <p className="text-red-500">Error: {error?.data?.message || 'Registration failed'}</p>}
          </div>
          <button type="button" onClick={toggle}
                  className="btn btn-link w-full max-w-xs mt-4 underline text-blue-500 hover:bg-blue-700 hover:text-white focus:outline-none rounded-lg outline font-montserrat outline-2 outline-blue-500">
            Already have an account? Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
