// DEFAULT IMPORTS FOR JWT/BCRYPT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// DEFAULT IMPORT FOR SQL
const db = require('../db_models/itnryModel.js')

//require dotenv config
require('dotenv').config();

//bring in secret key for jwt tokens
const secretKey = process.env.SECRET_KEY;

// NAMED IMPORT TO USE GLOBAL ERROR CONTROLLER ON ALL ERRORS
const { createError } = require('../serverConfigs/globalErrorHandler.js')

const userController = {
    /**
   * INITIALIZE "parameter controller" of NAMED IMPORT of 'FACTORY FUNCTION' 
   * labelled createError to string argument of 'userController'
   */

  createErr: createError('userController')
};

function generateToken (user) {
  const payload = {
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

userController.checkExistance = async (req, res, next) => {
  const { email, username } = req.dataVault.userInfo;

  try {
      // CHECK IF EMAIL OR USERNAME EXISTS IN THE "USERS" TABLE
      const query = `
        SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1;
      `;
      const values = [email, username];
      const result = await db.query(query, values);
      console.log(result.rows)

      if (result.rows && result.rows.length > 0) {
        console.log('Existance: Found')
        // IF THE QUERY RETURNS AT LEAST ONE ROW
        // A USER WITH THE EMAIL OR USERNAME EXISTS

          return next(userController.createErr({
            //  SERVER MESSAGES
            method: 'checkExistance',
            type: 'Checking existance of user error.', 
            //  CLIENT MESSAGES     
            message: 'Please try a different (1) username and/or (2) email.  User already exists.',
            statusCode: 409,
          })
        )
      } else {
        // NO USER WITH THE EMAIL OR USERNAME EXISTS
        console.log('Existance: None Found')
        return next(); 
      }
  } catch (err) {
      console.error('Database error:', err);
      return next(userController.createErr({
        //  SERVER MESSAGES
        err,
        method: 'checkExistance',
        type: 'Database error', 
        //  CLIENT MESSAGES     
        message: 'Internal Server Error',
        //  DEFAUT STATUS USED

      })
    );
  }
};


userController.hashUsrPw = async (req, res, next) => {

  try {
    const { password } = req.dataVault.userInfo;
    
    // GENERATE SALT ROUNDS AND HASH
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // OVERWRITE PW WITH HASHED PW
    req.dataVault.userInfo.password = hashedPassword;

    return next();

  } catch (err) {
    console.error("Error hashing password:", err);
    return next(userController.createErr({
      //  SERVER MESSAGES
      err,
      method: 'hashUsrPw',
      type: 'Error hashing/processing the password.', 
      //  CLIENT MESSAGES     
      message: 'Internal Server Error',
      //  DEFAUT STATUS USED
    })
  )}
};

userController.registerUser = async (req, res, next) => {

  console.log('here i am in registerd user');

    // DATAVAULT USED AS IT HAS HASHED PW
    const { email, username, password, firstName, lastName } = req.dataVault.userInfo;

    const insertUserQuery = `
      INSERT INTO users (email, username, password, firstName, lastName)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `
  try {
    // CREATE USER IN DB
    const result = await db.query(insertUserQuery, [email, username, password, firstName, lastName])  

    req.dataVault.userInfo.roles = req.dataVault.userInfo.roles || [];
    req.dataVault.userInfo.roles = result.rows[0].roles

    return next();

  } catch (err) {
    return next(userController.createErr({
      //  SERVER MESSAGES
      err,
      method: 'registerUser',
      type: 'Database Error.', 
      //  CLIENT MESSAGES     
      message: 'Failed to register user due to server error.',
      //  DEFAUT STATUS USED);
    })
  )}
};

userController.loginUser = async (req, res, next) => {

  const { email, password } = req.body.userInfo;

  try {

    const query = `SELECT roles, password, email, username FROM users WHERE email = $1;`
    const result = await db.query(query, [email]);
    console.log('result: ', result);


    if (result.rows.length > 0) {
      const userPw = result.rows[0].password;
      console.log('user password: ', userPw);
      

      const isPassValid = await bcrypt.compare(password, userPw);

      console.log("incoming password ", password)
      console.log("does pass match: ", isPassValid)

      if (!isPassValid) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const token = generateToken(result.rows[0]);
      const userInfo = {
        email: result.rows[0].email,
        username: result.rows[0].username,
        roles: result.rows[0].roles
      }

      return res.status(200).json({ userInfo, token });
      

    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    };

  } catch (err) {
    return next(userController.createErr({
      err,
      method: 'loginUser',
      type: `Database error:  ${err.message}`,
      message: 'Failed to login user due to server error.',
    })
  )};

}

// const getUser = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   try {
//     res.status(200).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email})
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error'});
//   }
  
// }

// // generate json web token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
// }

module.exports = userController;