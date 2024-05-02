/**
 * @module App.jsx
 * @description Main page of application. Contains all routing info
 */

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import React components for each route
import Main from './components/Main.jsx';
import Login from './components/register/Login.jsx';
import Register from './components/register/Register.jsx';
import Form from './components/Form.jsx';
import ItineraryPage from './components/ItineraryPage.jsx';
import SwitchLoginRegisterForms from './components/register/SwitchLoginRegisterForms.jsx';

const App = () => {
    return(
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='/login' element={<SwitchLoginRegisterForms />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/form' element={<Form />}/>
            <Route path='/itinerary' element={<ItineraryPage />}/>
          </Routes>
        </BrowserRouter>
    );
};

export default App;