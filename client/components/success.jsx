import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOauthMutation } from './../features/authSlice.js';
import Header from './Header.jsx';

const SuccessGit = () => {
    const [code, setCode] = useState('');
    const [oauthLogin, { isLoading: oauthLoading, error: oauthError }] = useOauthMutation();
    const success = useSelector(state => state.success);

    // Function to handle sending the code to the server
    const sendCodeToServer = async () => {
        try {
            // Call the mutation function to send the code to the server
            console.log(`Code: 2 ${code}`)
            await oauthLogin({ code: code });
        } catch (error) {
            console.error('Error sending code to server:', error.message);
        }
    };

    // useEffect to set code state from URL parameters and send code to server
    useEffect(() => {
        // Check if the URL contains an authorization code
        const urlParams = new URLSearchParams(window.location.search);
        const urlCode = urlParams.get('code'); // Renamed to avoid shadowing

        console.log(`Code: 1 ${urlCode}`); // Logging URL code

        // Set the code state if it exists
        if (urlCode) {
            setCode(urlCode);
        }

        // Call the function to send code to server
        sendCodeToServer();
    }, []);

    return(
        <div>
            <Header/>
            <h2>Success</h2>
            You are being redirected
            <button>Click here to redirect back to the homepage</button>
        </div>
    );
};

export default SuccessGit;
