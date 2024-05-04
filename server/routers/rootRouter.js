const express = require('express');
const rootRouter = express.Router();

rootRouter.get('/',
  (req, res, next) =>{ console.log("Welcome to the ['/'] ROOT endpoint."); return next(); },
  (req, res, next) =>{ console.log("Bye from the ['/'] ROOT endpoint. (but not before serving a file)"); return next(); },    
  (req, res) => { res.sendFile(path.join(__dirname,'../index.html')); }
)

module.exports = rootRouter;