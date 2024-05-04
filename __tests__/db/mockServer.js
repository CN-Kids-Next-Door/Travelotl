const express = require('express');
const userController = require('./UserController');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('/auth/login', userController.loginUserController, (req, res) => {
    console.log('Welcome to the ["/auth/login"] endpoint.');
    res.status(200).send({ user: req.user, token: "TOKEN" });
})

module.exports = app;