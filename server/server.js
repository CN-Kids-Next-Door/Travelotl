const express = require('express');
const path = require('path');

require('dotenv').config();

// Import routers and error handlers
const authRouter = require('./routers/authRouter.js');
const apiRouter = require('./routers/apiRouter.js');
const rootRouter = require('./routers/rootRouter.js');
const { globalErrorHandler, defaultErrorHandler } = require('./serverConfigs/globalErrorHandler.js');
const { setupMiddlewares, startServer } = require('./serverConfigs/serverConfigs.js');

const app = express();

setupMiddlewares(app);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app
    .get('/', rootRouter)

    .use('/auth', authRouter)

    .use('/api', apiRouter)

    .get('/oauth/github/callback', async (req, res) => {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ error: 'Authorization code not provided' });
        }

        try {
            // Exchange the authorization code for an access token
            const response = await fetch(`https://github.com/login/oauth/access_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code: code
                })
            });

            const data = await response.json();
            console.log('GitHub API Response:', data); // Appended logging statement

            const accessToken = data.access_token;

            // Use the access token to fetch user information from GitHub API
            const userResponse = await fetch(`https://api.github.com/user`, {
                headers: {
                    'Authorization': `token ${accessToken}`
                }
            });

            const userData = await userResponse.json();
            console.log('GitHub User Data:', userData); // Appended logging statement

            // Construct the user info object
            const userInfo = {
                username: userData.login,
                email: userData.email
            };

            // Respond with JSON containing userInfo and token
            res.status(200).json({ userInfo, token: accessToken });
        } catch (error) {
            console.error('Error exchanging code for access token:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
    .get('/success', (req, res) => {
        const accessToken = req.query.access_token;
        res.send(`Access token: ${accessToken}`);
    })

    .post('/api/post-code', (req, res) => {
        const code = req.body.code || req.query.code;
        if (!code) {
            return res.status(400).json({ error: 'Authorization code not provided' });
        }

        try {
            res.json({ success: true, message: 'Code received successfully' });
        } catch (error) {
            console.error('Error processing authorization code:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    .use(defaultErrorHandler)
    .use(globalErrorHandler);

startServer(app, PORT, HOST);

module.exports = app;
