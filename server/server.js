// IMPORTS
const express = require ('express');
const path = require ('path');

// .ENV FILE USAGE
require('dotenv').config();

//Stuff I just added today 4/27
const CLIENT_ID = "fb26bcfe259d6f2f503c"
const client_secret = "9d73905a903015abf5f249a7e899a4ddb725f15d"

// DEFAULT IMPORTS OF ROUTERS
const authRouter = require('./routers/authRouter.js');    // LOGIN, REGISTER, LOGOUT, ETC
const apiRouter = require('./routers/apiRouter.js');      // ITINERY, ETC
const rootRouter = require('./routers/rootRouter.js');    // SERVES FILES

// NAMED IMPORTS OF ERROR HANDLERS (Global and Default (e.g, 404) )
const { 
  globalErrorHandler, 
  defaultErrorHandler 
} = require('./serverConfigs/globalErrorHandler.js');

// NAMED IMPORTS OF MIDDLEWARE / SERVER CONFIGS
const { 
  setupMiddlewares, 
  startServer 
} = require('./serverConfigs/serverConfigs.js');

// SERVER DECLARATIONS
const app = express();

setupMiddlewares( app );

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app
// ROOT ROUTE FOR FILE SERVING (NON-WEBPACK)
   .get('/', rootRouter )
      /**
       *  ['/']          (FOR ROUTER see "./rootRouter.js")
       */
// ROUTERS FOR ROUTING
   .use('/auth', authRouter )
      /**
       *  ['/auth']      (FOR ROUTER see "./routers/authRouter.js")
       */
   .use('/api', apiRouter )
      /**
        * ['/api']       (FOR ROUTER see "./routers/apiRouter.js")
        * ['/api/itnry'] (FOR ROUTER see "./routers/apiRouters/itnryRouter.js")
        */
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
                     client_id: CLIENT_ID,
                     client_secret: client_secret,
                     code: code
                 })
             });
     
             const data = await response.json();
             const accessToken = data.access_token;
     
             // Redirect to the "/success" component with the access token as query parameter
             res.redirect(`/success?access_token=${accessToken}`);
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
   // Extract the code from the request body or query parameters
   const code = req.body.code || req.query.code;

   // Check if the code is provided
   if (!code) {
       return res.status(400).json({ error: 'Authorization code not provided' });
   }

   try {
       // Perform any necessary processing with the code (e.g., exchanging it for an access token)
       // For example, you could send the code to an OAuth provider's token endpoint
       
       // Send a response back to the client
       res.json({ success: true, message: 'Code received successfully' });
   } catch (error) {
       console.error('Error processing authorization code:', error);
       res.status(500).json({ error: 'Internal Server Error' });
   }
})
    
// 404 HANDLER
   .use( defaultErrorHandler )

// USE GLOBAL ERROR HANDLER
   .use( globalErrorHandler );

//START SERVER COMMAND
startServer( app, PORT, HOST );