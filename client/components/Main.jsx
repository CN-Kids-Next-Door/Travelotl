/**
 * @module Main
 * @description landing page component (homepage)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/AdobeStock_678891736_Preview[axolotl].png'
// import Header from './Header.jsx';
import travelVideo from '../assets/AdobeStock_118726863_travel_Preview.mp4'

const Main = () => {
    
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
                <img src={Logo} style={{height: '100px', width: '100px', position : 'absolute', left: '5%', top: '1%', zIndex: '3', transform: 'translateX(-50%)'   }} alt= 'Travolotl Logo'/>
            </div>
           <div className= 'text-4xl mt-20 text-white text-center z-50'>
                <h1 style={{fontFamily:'poppins'}}>
                Let us plan the trip of your dreams...
                </h1> 
                <Link to='/login' id='start'> Click here to begin your adventure!</Link>
           </div>
           <div>
           {/* <button style={{fontFamily:'poppins'}} onClick= {loginPageClick}
                className="relative shadow-2xl hover:scale-125
                hover:bg-opacity-50 shadow-white z-30 p-5 text-2xl text-white bg-blue-300 bg-opacity-70 rounded-xl mt-10">
                Click here to begin your adventure!
            </button> */} 
           </div>
         </header>
      </>
        
    )
};

export default Main; 