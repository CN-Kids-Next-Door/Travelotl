/**
 * @module Form
 * @description form component that renders child form page components
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web';

import Header from './Header.jsx';

import Destination from './formPages/Destination.jsx';
import Dates from './formPages/Dates.jsx';
import Activities from './formPages/Activities.jsx';
import Budget from './formPages/Budget.jsx';
import Travelers from './formPages/Travelers.jsx';
import GroupDescription from './formPages/GroupDescription.jsx';

// Create animated div to render child form components
const AnimatedRoutes = () => {

    // Captures the current pathway location
    const location = useLocation();

    // Retrieve the form page state from Redux store
    // const pageName = useSelector((state) => state.form.page);
    const pageName = useSelector((state) => state.form ? state.form.page : 'defaultPage');

    const pages = {
        'destination': <Destination />,
        'dates': <Dates />,
        'activities': <Activities />,
        'budget': <Budget />,
        'travelers': <Travelers />,
        'groupDescription': <GroupDescription />,
    }

    // Initialize form page state to form page component
    const [formPage, setFormPage] = useState(pages[pageName]);

    // Update the form page component everytime the page name changes
    useEffect(() => {
        setFormPage(pages[pageName]);
    }, [pageName]);

    // Needed to animate between form page components
    const transitions = useTransition(location?.pathname,{
        from: { position: 'absolute', width: '100%', opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });

    return transitions((style) => (
        <animated.div style={style}>
            {formPage}
        </animated.div>
    ));
};

const Form = () => {
    return(
        <>
          <Header />
          <div className='form-container'>
            <div>
                <h2>Enter in your travel details...</h2>
            </div>
            <div style={{position: 'relative'}}>
                <AnimatedRoutes />
            </div>
          </div>
        </>
    );
};

export default Form;