import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import travelVideo from './../../assets/flying_224323391_Video_4K_Preview.mp4'; // Ensure the correct video path

export default function SwitchLoginRegisterForms() {
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => {
        setIsLogin(!isLogin);
    };

    return ( 
    <>
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source
          src={travelVideo}
          type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="min-h-screen flex justify-center items-center">
        {isLogin ? (
            <Login toggle={toggle} />
        ) : (
            <Register toggle={toggle} />
        )}
      </div>
    </>
  );
}