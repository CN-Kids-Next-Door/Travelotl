// DEFAULT IMPORTS FOR JWT / DB (SQL)
const jwt = require('jsonwebtoken');
const db = require('../db_models/itnryModel.js')

// NAMED IMPORT TO USE GLOBAL ERROR CONTROLLER ON ALL ERRORS
const { createError } = require('./../serverConfigs/globalErrorHandler.js')

const authController = {    /**
* INITIALIZE "parameter controller" of NAMED IMPORT of 'FACTORY FUNCTION' 
* labelled createError to string argument of 'authController'
*/

  createErr: createError('authController')
};

authController.jwtReqCheck = (req, res, next) => {
  const { authorization } = req.headers;

  if ( authorization && authorization.startsWith('Bearer')) {
    req.dataVault.token = authorization.split(' ')[1];
    return next()
  } else {

    return next(vaultController.createErr({
      // SERVER MESSAGES
      method: 'protectReqCheck',
      type: "A valid 'Bearer' token is missing from req.headers.authorization", 
      // CLIENT MESSAGES     
      message: 'Not authorized, no token provided.',
      statusCode: 401,
    }))
  }
}

authController.jwtDecode = async (req, res, next) => {
     try {

      // Verify token
      const decoded = jwt.verify(req.dataVault.token, process.env.JWT_SECRET)

      const query = `SELECT user_id FROM users WHERE user_id = $1`;

      // Get user from the token, not including the hashed password
      const user = await db.query(query, [decoded.username]);
      console.log(user);

      return next();
    } catch (err) {

      return next(vaultController.createErr({
        // SERVER MESSAGES
        method: 'jwtDecode',
        type: "For the given JWT, there is no valid user associated in database.", 
        // CLIENT MESSAGES     
        message: 'Not authorized.',
        statusCode: 401,
      }))
    }
}

module.exports = authController;