import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useOauthMutation } from './../features/authSlice.js';
import Header from './Header.jsx';

const SuccessGit = () => {
    const [code, setCode] = useState('');
    const [oauthLogin, { isLoading: oauthLoading, error: oauthError }] = useOauthMutation();
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to handle sending the code to the server
    const sendCodeToServer = async () => {
        try {
            // Call the mutation function to send the code to the server
            console.log(`Code: 2 ${code}`)
            await oauthLogin({ code: code });
            navigate('/newitineraryform'); 
        } catch (error) {
            console.error('Error sending code to server:', error.message);
            // Handle error if necessary
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
            // Call the function to send code to server
            sendCodeToServer();
        }
    }, [navigate]); // Add navigate to dependency array

    return(
        <div>
            <Header/>
            <h2>Success</h2>
            You are being redirected
        </div>
    );
};

export default SuccessGit;
