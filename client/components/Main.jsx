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
      <Header />
      <div className="relative min-h-screen min-w-screen bg-black">
        {/* Apply a top-[4rem] to give space for the header. Adjust this value based on your actual header's height */}
        <video autoPlay muted loop className="fixed top-[4rem] left-0 w-full h-[calc(100vh-4rem)] object-cover z-0">
          <source src={travelVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <img src={Logo} alt='Travolotl Logo' className="absolute h-[200px] w-[300px] left-[10%] top-[5rem] z-30 -translate-x-1/2" />

        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-5 rounded-lg">
          <h1 className="text-4xl font-bold text-center text-white">
            Time to plan the trip of your dreams...
          </h1>
        </div>

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-[325px] h-[325px] flex flex-col items-center justify-center">
          <button className="mt-10 font-montserrat font-medium text-base leading-none py-3.5 px-4 rounded-full border-3 border-black"
              onClick={loginPageClick}>
              Click here to begin your adventure!
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;