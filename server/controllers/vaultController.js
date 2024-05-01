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
  structure.forEach(item => {
      item.keys.forEach(key => {
          obj[key] = key in obj ? obj[key] : item.defaultValue;
      });
  });
  return obj;
}


vaultController.initializeItnryVault = (req, res, next) =>{

  /**
   *  Inside "req.dataVault", initialize the following vaults:
   *  
   *  req.dataVault = {
   *    token:  <usedOnReturn>,     // NO VALUE FROM FRONTEND, SENT BACK WITH A TOKEN
   *    userInfo: {
   *      firstName: <Store firstName>
   *      lastName:  <Store lastName>
   *      email:     <Store email>
   *      password:  <Store password>        // PASSWORD is hashed then ovewrites PASSWORD
   *      username:  <Store username>
   *      roles: <usedOnReturn>    // NO VALUE FROM FRONTEND, SENT BACK WITH A ROLE
   *    },
   *    itinerary = {
   *      user_id:
   *      itnry_id:
   *      itinerary:
   *      location_destination:
   *      location_source:
   *      budget:
   *      travelers:
   *      date_start:
   *      date_end:
   *      group_description:
   *      itinerary_ai_preamble:
   *      itinerary_as_json:
   *    }
   *  }
   */
  req.dataVault = {
    userInfo: {
      firstName: "Jane",
      lastName: "Doe",
      email: "Re_al_T_V@aol.com",
      password: "Delta63/*",
      userName: "DammitJanet"
    }

  }

  try{
    req.dataVault = req.dataVault || {};
    console.log("REGISTER:: vaultController.initializeItnryVault")
    const structdefDataVault = [
      { keys: ['token'], defaultValue: '' }, // Set token to a default empty string
      { keys: ['userInfo', 'itinerary'], defaultValue: {} }
    ];
  
    const structdefUserInfo = [
      { keys: ['firstName', 'lastName', 'email', 
               'password', 'username'], defaultValue: {} },
      { keys: ['roles'], defaultValue: [] }
    ];
  
    const structdefItinerary = [
      { keys: ['itnry_id', 'itinerary_ai_preamble', 'itinerary_ai_json', 'user_id', 'location_destination', 
      'location_source', 'budget', 'travelers', 'date_start', 
      'date_end', 'group_description'], defaultValue: {} },            
      { keys: ['activities'], defaultValue: [] }
    ];

    req.dataVault = ensureObjectStructure(req.dataVault, structdefDataVault);
    req.dataVault.userInfo = ensureObjectStructure(req.dataVault.userInfo, structdefUserInfo);
    req.dataVault.itinerary = ensureObjectStructure(req.dataVault.itinerary, structdefItinerary);

    console.log("second step")
    return next();

  } catch ( err ){
    return next(vaultController.createErr({
      //  SERVER MESSAGES
      err,
      method: 'initializeItnryVault',
      type: 'Error intializing req.dataVault for token, userInfo, and itinerary', 
      //  CLIENT MESSAGES     
      message: 'Internal Server Error',
      //  DEFAUT STATUS USED
    })
  )}
}

vaultController.userBodyCheck = (req, res, next ) => {
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
  console.log("REGISTER::  vaultController.populateUsrVault")
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

  const { username, roles } = req.dataVault.userInfo;

  res.locals.userInfo = res.locals.userInfo || {};
  res.locals.userInfo.username = res.locals.userInfo.username || {};
  res.locals.userInfo.roles = res.locals.userInfo.roles || [];
  res.locals.token = res.locals.token || {};

  res.locals.userInfo.username = username;
  res.locals.userInfo.roles = roles;

  res.locals.token = '';

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

vaultController.checkItnry_id = ( req, res, next ) => {

  let { itnry_id } = req.params;

  itnry_id = parseInt(itnry_id, 10);

  // ALL FIELDS CHECK
  if (!itnry_id || !Number.isInteger(Number(itnry_id)) || Number(itnry_id) <= 0) {
    return next(vaultController.createErr({
      // SERVER MESSAGES
      method: 'checkItnry_id',
      type: 'Validation error for req.params.itnry_id.', 
      // CLIENT MESSAGES     
      message: 'The itnry_id must be a positive integer.',
      statusCode: 400,
    }));
  }
  return next();
}

vaultController.populateItnry_id = ( req, res, next ) => {
  const { itnry_id } = req.params;
  console.log("third step")
  if (req.headers.authorization) {
    req.dataVault.token = req.headers.authorization.split(' ')[1];
  }
  console.log("third st2ep")
  req.dataVault.itinerary.itnry_id = itnry_id;
  console.log("third step")
  return next();
}

vaultController.resLocalsItnrySave = ( req, res, next ) => {

  res.locals = req.dataVault.itinerary;

  return next();
}

vaultController.cleanupItnryVault = (req, res, next) =>{
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

vaultController.populateItnryVault = ( req, res, next ) => {
  console.log(req.body)
  const { 
    itnry_id, name, location_destination, 
    location_source, budget, travelers, 
    date_start, date_end, group_description 
  } = req.body.itinerary

  req.dataVault.itinerary = req.body.itinerary

  console.log("dataVault", req.dataVault)
  
  return next();
}

function extractSegments(fullText) {
  const firstBacktickIndex = fullText.indexOf('```');
  const secondBacktickIndex = fullText.lastIndexOf('```');

  if (firstBacktickIndex === -1 || secondBacktickIndex === -1 || firstBacktickIndex === secondBacktickIndex) {
      throw new Error("Malformed request: Cannot find JSON delimiters.");
  }

  const startOfJson = firstBacktickIndex + 7; // Move past the first '```json '
  const endOfJson = secondBacktickIndex;      // Stop at the beginning of the last '```'

  const preamble = fullText.substring(0, firstBacktickIndex).trim();
  const json = fullText.substring(startOfJson, endOfJson).trim();

  return { preamble, json };
}

function cleanJsonString(itinerary_ai_json) {
  return itinerary_ai_json.replace(/^.*?{/, '{').replace(/}.*$/, '}');
}

// Function to remove comments from JSON-like strings
function removeComments(jsonString) {
  return jsonString.replace(/\/\/.*$/gm, ''); // Removes single-line comments
}

// Main controller function
vaultController.parseItinerary_ai = (req, res, next) => {
  try {
    const fullText = req.dataVault.itinerary.itinerary_ai_preamble;
    console.log("fulltext::", fullText);

    const { preamble, json } = extractSegments(fullText);
    const noCommentsJson = removeComments(json); // Remove comments before parsing
    const cleanedJson = cleanJsonString(noCommentsJson);
    const parsedJson = JSON.parse(cleanedJson);

    // Update dataVault with new parsed JSON and additional context
    req.dataVault.itinerary = {
        ...req.dataVault.itinerary,
        itinerary_ai_preamble: preamble,
        itinerary_ai_json: parsedJson.itinerary, // Store parsed JSON object
    };

    return next();
  } catch (e) {
    console.error("Error parsing JSON: ", e);
    return res.status(400).send(`JSON parse error: ${e.message}`);
  }
};

module.exports = vaultController;