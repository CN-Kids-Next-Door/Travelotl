import React, {  useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './../../assets/Travelotl_Logo.png';
import { useLoginMutation, useOauthMutation } from './../../features/authSlice.js';

const Login = ({ toggle }) => {
    // Initialize empty state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const [oauthLogin, { isLoading: oauthLoading, error: oauthError }] = useOauthMutation();
    
    // Needed to navigate to different pathways
    const navigate = useNavigate();

    /* handleSubmit: asynchoronous event handling function
      - handles the submission of the login form
      - makes a POST request to the server with inputted email and password
      - stores a user token in local storage, then navigates back to main page
    */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const startTime = Date.now();

    try{
      // Make fetch request with submitted data
      const payload = await login({ userInfo: { email, password }}).unwrap();

      // DELAY LOGIN
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      console.log('Login successful', payload );
      // Check for ok response and redirect back to main
      navigate('/form');

      } catch ( err ) {
        console.error('Login failed:', err);
      }
   };

  const handleOauthLogin = async ( code ) => {
    try {
        const userData = await oauthLogin({ code }).unwrap(); // Call the mutation with the provider data
        console.log('Login successful', userData);
        // Redirect or perform additional actions upon successful login
    } catch (err) {
        console.error('Error during OAuth login:', err);
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
  function registerGH() {
      window.location.assign("")
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
  {/* <div className="absolute inset-0 bg-white bg-opacity-90"></div>  Overlay for opacity */}

  <img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[10%] top-[1rem] z-30 -translate-x-1/2"/>

  <div className="absolute left-[65%] top-[55%] -translate-x-1/2 z-30 transform -translate-y-1/2 rotate-[5.7deg]">
    
    <h2 style={{textShadow: 
              '2px 0 0 white, 0 2px 0 white, -2px 0 0 white, 0 -2px 0 white' }}
              className="text-3xl font-montserrat font-semibold text-center text-gray-700 mb-8">
      Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-montserrat mb-2">
          Email:
          <br/>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                 placeholder='codesmith@test.com' className="input input-bordered w-full max-w-xs rounded-lg font-montserrat outline outline-2 outline-blue-500"/>
        </label>
      </div>
      <div>
        <label className="block font-montserrat mb-2">
          Password:
          <input type='password' id ='password' value={password} onChange={(e) => setPassword(e.target.value)}
                 placeholder='Not 1234' className="input input-bordered w-full max-w-xs rounded-lg outline outline-2 font-montserrat outline-blue-500"/>
                 <img id='passwordImage' src='https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png' className='h-5 w-5 inline-block ml-[75%] mt-[-20.75%]' onClick={handlePasswordVisibility}/>
        </label>
      </div>
      <button type="submit" disabled={isLoading}
        className={`btn btn-primary font-montserrat w-full max-w-xs ${isLoading ? 'loading' : ''} transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg outline outline-2 outline-blue-500`}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {isError && <p className="text-red-500">Error: {error?.data?.message || 'Login failed'}</p>}
      <button onClick={logIn}
              className="btn btn-secondary w-full max-w-xs mt-4 transition duration-150 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-montserrat focus:ring-opacity-50 rounded-lg outline outline-2 outline-gray-500">
        Login Through Github
      </button>
      <button type="button" onClick={toggle}
              className="btn btn-link w-full max-w-xs mt-4 underline font-montserrat text-blue-500 hover:text-blue-700 focus:outline-none rounded-lg outline outline-2 outline-blue-500">
        Go to Signup Page
      </button>
    </form>
  </div>
</div>

    
    );
};

export default Login;
