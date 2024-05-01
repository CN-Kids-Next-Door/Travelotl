/**
 * @module Main
 * @description landing page component (homepage)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Travelotl_Logo.png'
// import Header from './Header.jsx';
import travelVideo from '../assets/AdobeStock_118726863_travel_Preview.mp4'

const Main = () => {
    const navigate = useNavigate();
    function loginPageClick (){
        navigate('/login');
    }
    return(
       <>
       <header className="flex flex-col items-center justify-center min-h-screen size-1 overflow-hidden">
          <video
              autoPlay
              loop
              muted
              className= "absolute object-top z-10 min-w-screen min-h-screen"
              style={{height:'100vh', width: '100vw' }}
          >
              <source

                  src={travelVideo}
                  type="video/mp4"
              />
              Your browser does not support the video tag.
          </video>
            <div>
                <img src={Logo} style={{height: '200px', width: '300px', position : 'absolute', left: '10%', top: '1%', zIndex: '3', transform: 'translateX(-50%)'   }} alt= 'Travolotl Logo'/>
            </div>
            <div style={{position : 'absolute', left: '50%', top: '70%', zIndex: '3', transform: 'translateX(-50%)'   }}>
                <h1 className="text-3xl font-semibold text-center text-white mt-[-50px] mb-8">
                    Time to plan the trip of your dreams...
                </h1>
            </div>
           <div style={{ left: '50%', top: '20%'}}>
                <button style={{fontFamily:'poppins'}}  onClick= {loginPageClick}
                    className="relative shadow-2xl hover:scale-125
                    hover:bg-opacity-50 shadow-white z-30 p-5 text-2xl text-white bg-blue-300 bg-opacity-70 rounded-xl mt-10">
                    Click here to begin your adventure!
                </button>
           </div>
         </header>
      </>
        
    )
};

export default Main; 