/**
 * @module App.jsx
 * @description Main page of application. Contains all routing info
 */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import React components for each route
import Main from './components/Main.jsx';
import SwitchLoginRegisterForms from './components/register/SwitchLoginRegisterForms.jsx';
import Register from './components/register/Register.jsx';

import ItinerariesPage from './components/itineraries/ItinerariesPage.jsx';
import ItinerariesPage1 from './components/itineraries/ItinerariesPage1.jsx';
import SuccessGit from './components/success.jsx';


import ItinerariesWelcome from './components/ItinerariesWelcome/ItinerariesWelcome.jsx';

import NewItineraryForm from './components/ItinerariesWelcome/formPages/NewItineraryForm.jsx';
import Test from './components/itinerariesTest/Test.jsx';

const App = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/login' element={<SwitchLoginRegisterForms />}/>
            <Route path='/register' element={<Register />}/>

            <Route path='/itinerary' element={<ItinerariesPage />}/>
            <Route path='/itinerary1' element={<ItinerariesPage1 />}/>
            <Route path='/success' element={<SuccessGit />}/>

            <Route path='/newitineraryform' element={<NewItineraryForm />}/>

            <Route path='/itinerarieswelcome' element={<ItinerariesWelcome />}/>
          </Routes>
        </BrowserRouter>
    );
};

export default App;