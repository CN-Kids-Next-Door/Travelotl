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
    <div className="min-h-screen flex justify-center items-center">
      
      <video
        autoPlay
        loop
        muted
        className="absolute min-w-screen min-h-screen"
        style={{height:'105vh', width: '115vw' }}>
        <source
            src={travelVideo}
            type="video/mp4" />
      Your browser does not support the video tag.

      </video>

      {isLogin ? (
          <Login toggle={toggle} />
      ) : (
          <Register toggle={toggle} />
      )}
    </div>
  );
}