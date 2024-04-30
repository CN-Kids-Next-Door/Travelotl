// NAMED IMPORT TO USE GLOBAL ERROR CONTROLLER ON ALL ERRORS
const { createError } = require('./../serverConfigs/globalErrorHandler.js')


const vaultController = {
  /**
   * INITIALIZE "parameter controller" of NAMED IMPORT of 'FACTORY FUNCTION' 
   * labelled createError to string argument of 'vaultController'
   */

  createErr: createError('vaultController')
};

function ensureObjectStructure(obj, structure) {
  return structure.reduce((acc, key) => {
    acc[key] = acc[key] || {};
    return acc;
  }, obj);
}

vaultController.initializeUsrVault = (req, res, next) =>{

  /**
   *  Initialize the Following (for ['/auth/login, /auth/register, /auth/logut']):
   *  
   *  req.dataVault = {
   *    userInfo: {
   *      firstName: <Store firstName>
   *      lastName:  <Store lastName>
   *      email:     <Store email>
   *      password:  <Store password>
   *      username:  <Store username>
   *    }
   *    token:  <Store token>
   *  }
   */

  try{
    req.dataVault = req.dataVault || {};
    ensureObjectStructure(req.dataVault, ['userInfo']);
    const keys = ['firstName', 'lastName', 'email', 'password', 'username'];
    keys.forEach(key => {
      ensureObjectStructure(req.dataVault.userInfo, [key]);
    });
    req.dataVault.token = req.dataVault.token || {};

    return next();

  } catch (err){
    return next(createErr({
      //  SERVER MESSAGES
      method: 'checkExistance',
      type: 'dataVault.userInfo initalize error', 
      //  CLIENT MESSAGES     
      message: 'Internal Server Error',
      //  DEFAUT STATUS USED
      err
    })
  )}
}

vaultController.registerBodyCheck = (req, res, next ) => {
  const { firstName, lastName, username, password, email } = req.body.userInfo;

  // ALL FIELDS CHECK
  if ( !email || 
       !username || 
       !password || 
       !firstName || 
       !lastName
  ) {
    
    return next(vaultController.createErr({
      //  SERVER MESSAGES
      method: 'registerBodyCheck',
      type: 'Checking if all fields in req.body are present.', 
      //  CLIENT MESSAGES     
      message: 'Please add all required fields.',
      statusCode: 400,
    })
  )}

  return next();
}

vaultController.populateUsrVault = (req, res, next) =>{

  // TRANFER FROM req.body TO req.dataVault
  if (req.body.userInfo) {
    const { firstName, lastName, email, password, username } = req.body.userInfo;
    req.dataVault.userInfo = {
        firstName: firstName || req.dataVault.userInfo.firstName,
        lastName: lastName || req.dataVault.userInfo.lastName,
        email: email || req.dataVault.userInfo.email,
        password: password || req.dataVault.userInfo.password,
        username: username || req.dataVault.userInfo.username
    };
  }

  return next();
}

vaultController.resLocalsSave = (req, res, next) =>{
  /*
  *  CLEANUP OF req.dataVault
  */
 console.log('in reslocalssave');
  const { username, roles } = req.dataVault.userInfo;

  res.locals.userInfo.username = res.locals.userInfo.username || {};
  res.locals.userInfo.roles = res.locals.userInfo.roles || [];
  res.locals.token = res.locals.token || {};

  res.locals.userInfo.username = username;
  res.locals.userInfo.roles = roles;
  res.locals.token = 'FAKETOKEN';

  return next();
}


vaultController.cleanupUsrVault = (req, res, next) =>{
  /*
  *  CLEANUP OF req.dataVault
  */

  res.on('finish', () => {
    console.log('Cleaning up req.dataVault');

    if (req.dataVault) {
        delete req.dataVault;
    }
  });

  return next();
}

module.exports = vaultController;