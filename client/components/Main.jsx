import React from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Travelotl_Logo.png';
import travelVideo from '../assets/AdobeStock_118726863_travel_Preview.mp4';
import Header from './Header.jsx';

const Main = () => {
  const navigate = useNavigate();

  function loginPageClick() {
    navigate('/login');
  };

  return (
    <>
      <div className="relative min-h-screen min-w-screen bg-black">
        {/* Apply a top-[4rem] to give space for the header. Adjust this value based on your actual header's height...to turn off header: changed them to 0 to remove black space and comment out header tag on line 23*/}
        <video autoPlay muted loop className="fixed top-[4rem] left-0 w-full h-[calc(100vh-4rem)] object-cover z-0">
          <source src={travelVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
     
      <Header />

        <img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[10%] top-[1rem] z-30 -translate-x-1/2" />

        <div className="absolute left-1/2 top-[35em] z-30 -translate-x-1/2 -translate-y-1/2  p-5 rounded-lg">
          <h1 style={{textShadow: 
              '2px 0 0 white, 0 2px 0 white, -2px 0 0 white, 0 -2px 0 white' }} className="text-3xl font-bold text-center font-montserrat text-black">
            Time to plan the trip of your dreams...
          </h1>
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[325px] flex flex-col items-center justify-center">
          <button style={{textShadow: 
              '1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black', borderRadius:'25%',border:'solid grey 1px' }} className="mt-10 font-montserrat relative top-[13em] shadow-2xl hover:scale-125
                hover:bg-opacity-50 shadow-white z-30 p-5 text-xl text-blue bg-blue-300 bg-opacity-70 rounded-xl"
              onClick={loginPageClick}>
              Click here to begin your adventure!
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;