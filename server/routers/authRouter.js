const express = require('express');
const authRouter = express.Router();
const userController = require('./../controllers/userController.js');
const vaultController = require('./../controllers/vaultController.js');

// REGISTER
authRouter
  .post('/register',
    (req, res, next) =>{ 
      console.log("req.body:", req.body)
      console.log("Welcome to the ['/auth/register'] endpoint."); 
      return next(); 
    },
    // vaultController.registerBodyCheck,
    vaultController.initializeItnryVault,
    vaultController.populateUsrVault,
    userController.checkExistance,
    userController.hashUsrPw,
    userController.registerUser,
    vaultController.resLocalsSave,
    vaultController.cleanupItnryVault,
    (req, res, next) =>{ console.log("Bye from the ['/auth/register'] endpoint."); return next(); },
    (req, res) => res.status(200).json( res.locals )
  )

// LOGIN
  .post('/login',
    (req, res, next) =>{ console.log("Welcome to the ['/login'] endpoint."); return next(); },
    userController.loginUser,
    // (req, res, next) =>{ console.log("Bye from the ['/auth/login'] endpoint."); return next(); },    
    // (req, res) =>{ return res.status(200).json("Some custom message to ['/api/login'] at POST.") }
  )

// LOGOUT
  .post('/logout',
    (req, res, next) =>{ console.log("Welcome to the ['/logout'] endpoint."); return next(); },
    (req, res, next) =>{ console.log("Bye from the ['/auth/logout'] endpoint."); return next(); },  
    (req, res) =>{ return res.status(200).json("Some custom message by ['/api/logout'] at POST."); }
  )

module.exports = authRouter;