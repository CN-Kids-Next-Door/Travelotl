const express = require('express');
const apiRouter = express.Router();

const itnryRouter = require('./apiRouters/itnryRouter.js')
// WELCOME TO API ENDPOINT ('/api')

// ['/api'] ROOT ENDPOINT IS HERE:
apiRouter
  .post('/', 
    (req, res, next) =>{ console.log("Welcome to the ['/api/'] ROOT endpoint."); return next(); },
    (req, res, next) =>{ console.log("Bye from the ['/auth/'] endpoint."); return next(); },  
    (req, res) => { return res.status(200).json('Some custom message to ['/api/'] at POST.'); }
  )

// ['/api/:user_id/itnry'] ENDPOINT STARTS HERE
  .use('/:user_id/itnry', itnryRouter);

module.exports = apiRouter;