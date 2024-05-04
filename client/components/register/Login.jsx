import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/Travelotl_Logo_white.png';
import { useLoginMutation, useOauthMutation } from './../../features/authSlice.js';

const CLIENT_ID = "fb26bcfe259d6f2f503c"

const Login = ({ toggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const [oauthLogin, { isLoading: oauthLoading, error: oauthError }] = useOauthMutation();
    
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = await login({ userInfo: { email, password }}).unwrap();
            console.log('Login successful', payload);
            navigate('/newitineraryform');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const handleOauthLogin = async (code, email) => {
        try {
            const userData = await oauthLogin({ code, email }).unwrap();
            console.log('Login successful', userData);
            // Redirect to main page after successful authentication
            navigate('/form');
        } catch (err) {
            console.error('Error during OAuth login:', err);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            const userEmail = localStorage.getItem('userEmail');
            handleOauthLogin(code, userEmail);
        }
    }, [navigate]);

    function logIn() {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user:email`);
    }

    function handlePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const passwordImage = document.getElementById('passwordImage');
        if (passwordInput.getAttribute('type') === 'password') {
            passwordInput.setAttribute('type', 'text');
            passwordImage.setAttribute('src', 'https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png');
        } else {
            passwordInput.setAttribute('type', 'password');
            passwordImage.setAttribute('src', 'https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png');
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-cover bg-center p-4" style={{ backgroundImage: 'url(path_to_your_image.jpg)' }}>
            <img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[10%] top-[1rem] z-30 -translate-x-1/2" />
            <div className="absolute left-[66%] top-[60%] -translate-x-1/2 z-30 transform -translate-y-1/2 rotate-[5.7deg]">
                <h2 style={{ textShadow: '2px 0 0 white, 0 2px 0 white, -2px 0 0 white, 0 -2px 0 white' }} className="relative text-3xl left-[-5%] top-[180%]font-montserrat font-semibold text-center text-gray-700 mb-8">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-montserrat mb-2">
                            Email:
                            <br />
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='codesmith@test.com' className="input input-bordered w-full max-w-xs rounded-lg font-montserrat outline outline-2 outline-blue-500" />
                        </label>
                    </div>
                    <div>
                        <label className="block font-montserrat mb-2">
                            Password:
                            <input type='password' id ='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Not 1234' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 font-montserrat outline-blue-500" />
                            <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' className='h-5 w-5 inline-block ml-[78%] mt-[-17.75%]' onClick={handlePasswordVisibility} />
                        </label>
                    </div>
                    <button type="submit" disabled={isLoading} className={`btn btn-primary font-montserrat w-full max-w-xs ${isLoading ? 'loading' : ''} transition duration-150 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg outline outline-2 outline-blue-500`}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {isError && <p className="text-red-500">Error: {error?.data?.message || 'Login failed'}</p>}
                    <button onClick={logIn} className="btn btn-secondary w-full max-w-xs mt-4 transition duration-150 ease-in-out hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 font-montserrat focus:ring-opacity-50 rounded-lg outline outline-2 outline-gray-500">
                        Login Through Github
                    </button>
                    <button type="button" onClick={toggle} className="btn btn-link w-full max-w-xs mt-4 underline font-montserrat text-blue-500 hover:bg-blue-700 hover:text-white focus:outline-none rounded-lg outline outline-2 outline-blue-500">
                        Go to Signup Page
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
