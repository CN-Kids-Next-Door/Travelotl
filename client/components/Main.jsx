/**
 * @module Main
 * @description landing page component (homepage)
 */

import React from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Travelotl_Logo.png'
// import Header from './Header.jsx';
import travelVideo from '../assets/AdobeStock_118726863_travel_Preview.mp4'


const Main = () => {
  const navigate = useNavigate();

  function loginPageClick (){
      navigate('/login');
  };

  return(
    <>
      <header className="flex flex-col items-center justify-center min-h-screen size-1 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className= "fixed z-10 "
          style={{
            margin:'0',
            padding: '0',
            top:'0',
            left:'0',
            width:'100%',
            height:'100%',
            overflow:'hidden' 
          }}>

          <source
            src={travelVideo}
            type="video/mp4"/>

          Your browser does not support the video tag.
        </video>

        <div>
          <img 
            src={Logo} 
            alt='Travolotl Logo'
            style={{
              height: '200px', 
              width: '300px', 
              position : 'absolute', 
              left: '10%', 
              top: '1%', 
              zIndex: '3', 
              transform: 'translateX(-50%)'   
            }}
          />
        </div>

        <div 
          style={{
            position : 'absolute', 
            left: '50%', 
            top: '70%', 
            zIndex: '3', 
            transform: 'translateX(-50%)',
            fontFamily:'Montserrat Alternates',
            textShadow: 
              '2px 0 0 white, 0 2px 0 white, -2px 0 0 white, 0 -2px 0 white' 
          }}>
          <h1 className="text-3xl font-semibold  text-center text-white mt-[-50px] mb-8">
            Time to plan the trip of your dreams...
          </h1>
        </div>

        <div style={{ position: 'relative', top: '-200px', width: '325px', margin:'0 auto'   }}>
          <button 
            style={{fontFamily:'Montserrat Alternates', padding: '15px', borderRadius:'25%', fontSize:'1em', border:'solid black 3px',   }}  
            onClick= {loginPageClick}
            >
            Click here to begin your adventure!
          </button>
        </div>

      </header>
    </>
  )
};

export default Main; 