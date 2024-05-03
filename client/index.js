/**
 * @module index.js
 * @description entry point for application
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store.js';

import App from './App.jsx';
// IMPORT OF TAILWINDS
import './styles.css';
// Render React app off of 'root' element using DOM manipulation
const root = createRoot(document.getElementById('root'));

root.render(
    // Wrap app in Provider component to pass store (access to state)
    <Provider store={store}>

        <App />

    </Provider>
);