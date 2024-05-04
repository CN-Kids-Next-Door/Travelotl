import React, { useState } from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import BackgroundImage from '../../assets/login_reg_image2.jpg';

export default function SwitchLoginRegisterForms() {
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen bg-cover bg-fixed bg-no-repeat"
             style={{ backgroundImage: `url(${BackgroundImage})` }} >
            {isLogin ? (
                <Login toggle={toggle} />
            ) : (
                <Register toggle={toggle} />
            )}
        </div>
    );
}
