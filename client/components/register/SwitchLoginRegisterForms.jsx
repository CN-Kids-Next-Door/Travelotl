import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import BackgroundImage from '../../assets/login_reg_image.jpg';
export default function SwitchLoginRegisterForms() {
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => {
        setIsLogin(!isLogin);
    };

    return (
    <div style={{ backgroundImage:`url(${BackgroundImage})`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' ,height: '100vh'}} >
      
      
      {isLogin ? (
          <Login toggle={toggle} />
      ) : (
          <Register toggle={toggle} />
      )}
    </div>
  );
}