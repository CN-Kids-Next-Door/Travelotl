const express = require('express');
const axios = require('axios')
const { Configuration, OpenAIApi } = require('openai');
const db = require('../db_models/itnryModel.js')

// NAMED IMPORT TO USE GLOBAL ERROR CONTROLLER ON ALL ERRORS
const { createError } = require('./../serverConfigs/globalErrorHandler.js')

require('dotenv').config();
// const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
const app = express();

const apiKey = process.env.OPEN_AI_API_KEY;
const url = 'https://api.openai.com/v1/chat/completions';

const itnryController = {
  /**
   * INITIALIZE "parameter controller" of NAMED IMPORT of 'FACTORY FUNCTION' 
   * labelled createError to string argument of 'vaultController'
   */

  createErr: createError('itnryController')
}

  // buildTrip - To fetch itinerary from API request to Open AI
itnryController.buildTrip = async (req, res, next) => {
  const { 
    user_id,
    location_destination,
    location_source,
    budget,
    activities,
    travelers,
    date_start,
    date_end,
    group_description,
    itinerary_ai_preamble,
  } = req.dataVault.itinerary;

  const prompt = `Make an itinerary for a trip for 
    ${travelers} from ${location_source} to 
    ${location_destination} from ${date_start} until 
    ${date_end}. At the bare minimum, provide an itinerary
    for every 3rd day.  I have a budget of ${budget}. Include the 
    following types of attractions: ${activities.join(', ')} 
    for a ${group_description}. Organize the itinerary by 
    the following times of day: morning, afternoon, and 
    evening. Recommend specific places of interest with 
    their address. Limit cross-city commutes by grouping 
    places of interest by geography for each day. Output 
    the response in json format following this schema:
    \`\`\`json
    {
      itinerary: {
        date: {
          time of day: {
            activity: string,
            description: string,
            address: string,
            cost: number,
          }
        }
      }
    }
    \`\`\`
    Please note that the cost, inside the object, should 
    the the cost for that particular activity during that 
    particular time of the day.  The cost should be an 
    estimated cost.

    Only provide a preamble.  That is, before the json provide
    a brief summary of the trip and the underlying decisions
    for the choices.  Do not provide a postable, that is text
    after the json.

    Do not provide text like
    (Similar entries would continue for each day up through 2/5/2025)
    inside the JSON.

    Always use three backticks followed by the string "json" as the 
    delimiters to identify the JSON output.

    Again, provide an itinerary for every 3rd day.  Should budget
    be lacking look at free events, outdoor shows, or non profit events.

    Please do not use markup formatting.

    Finally, include a heading that briefly describes the trip in a 
    playful and thoughtful manner.  Absolutely do not use # in at all.

    Make sure that the heading is encapsulated inside <h1> and </h1> tags
    whereas the description is encapsulated inside <p> tags.  Make
    sure this encapsulation happens.  Always.  Absolutely no alternatives.

    Thank you.
  `;

  try {

    const response = await axios.post(url, {
      model: "gpt-4-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant." }, 
                 { role: "user", content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

  console.log("Response from GPT-4.0:");
  console.log(response.data.choices[0].message.content);

  req.dataVault.itinerary.itinerary_ai_preamble=response.data.choices[0].message.content

  return next()
  } catch (error) {
    console.error('Error querying OpenAI GPT-4.0:', error.message);

    // Use a custom method to log or handle errors appropriately
    next(itnryController.createErr({
      err: error,
      method: 'buildTrip',
      type: 'API Call Failed',
      message: 'Failed to build trip due to an internal API error',
      statusCode: error.response ? error.response.status : 500
    }));
  }
}

// saveTrip - To save the contents of the generated itinerary into the database
itnryController.saveItnry = async (req, res, next) => {
  if (!req.dataVault || !req.dataVault.itinerary) {
    return next(itnryController.createErr({
      message: 'No itinerary data provided',
      statusCode: 400,
      type: 'Validation Error'
    }));
  }

  const { 
    user_id, 
    location_destination, 
    location_source, 
    budget, 
    travelers, 
    date_start, 
    date_end, 
    group_description,
    itinerary_ai_preamble,
    itinerary_ai_json,
  } = req.dataVault.itinerary;

  if (!user_id || !location_destination || !location_source || !budget || !travelers || !date_start || !date_end) {
    return next(itnryController.createErr({
      message: 'Required itinerary field missing',
      statusCode: 400,
      type: 'Validation Error'
    }));
  }

  const query = `
    INSERT INTO itinerary (
      user_id, 
      location_destination, 
      location_source,
      budget, 
      travelers, 
      date_start, 
      date_end, 
      group_description,
      itinerary_ai_preamble,
      itinerary_ai_json
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING itnry_id;
  `;

  const params = [
    user_id,
    location_destination,
    location_source,
    budget, 
    travelers,
    date_start,
    date_end,
    group_description,
    JSON.stringify(itinerary_ai_preamble),
    itinerary_ai_json,
  ];

  try {

    const result = await db.query(query, params);

    return next();
  } catch (err) {

    if (err.code === '23505') { // POSTGRES SQL ERROR CODE FOR UNIQUENESS VIOLATION
      return next(itnryController.createErr({
        //  SERVER MESSAGES
        err,
        method: 'saveItnry',
        type: 'Itinerary already exists for some reason, cannot create this itinerary',
        //  CLIENT MESSAGES    
        message: 'Itinerary already exists',
        statusCode: 409,
      }));
    } else if (err.code === '23502') { // POSTGRES ERROR CODE FOR NOT NULL VIOLATION
      return next(itnryController.createErr({
        //  SERVER MESSAGES
        err,
        method: 'saveItnry',
        type: 'A field was NULL when the SQL database does not permit NULL entries for that field',
        //  CLIENT MESSAGES    
        message: 'Required field missing',
        statusCode: '400',
      }));
    } else if (err.code === '23505') { // POSTGRES ERROR CODE FOR UNIQUE CONSTRAINT VIOLATION
      return next(itnryController.createErr({
        // SERVER FACING - FOR DIAGNOSIS
        err,
        method: 'saveItnry',
        type: `Unique constraint violation: The operation attempted to insert or update an entry that would result in duplicate data in a column that must be unique, such as a primary key.Error:: ${err.message}`,
        // CLIENT FACING
        message: 'Operation failed: the data already exists.',
        statusCode: '409', // 409 Conflict might be more appropriate than 500 Internal Server Error
      }));
    } else if (err.code === '42703') { // POSTGRES ERROR CODE FOR UNDEFINED COLUMN
      return next(itnryController.createErr({
        // SERVER FACING - FOR DIAGNOSIS
        err,
        method: 'saveItnry',
        type: `Undefined column error: The SQL statement references a column that does not exist in the database schema.  Error:: ${err.message}`,
        // CLIENT FACING
        message: 'Operation failed: the request references an invalid field.',
        statusCode: '400',
      }));
    } else {
      return next(itnryController.createErr({
        //  SERVER MESSAGES
        err,
        method: 'saveItnry',
        type: `During the save attempt, something went wrong and there was a failure to save itinerary to the database.  Error:: ${err.message}`,
        //  CLIENT MESSAGES    
        message: 'Failed to save itinerary to the database',
        //  DEFAULT STATUS CODE
      }));
    }  
  }
};
  
// deleteItnry - To delete the itinerary from the database based on itrnyId
itnryController.deleteItnry = async (req, res, next) => {

  // SQL query to delete an itinerary and return the deleted record
  const query = `
    DELETE FROM itinerary
    WHERE itnry_id = $1
    RETURNING *;
  `;

  console.log(req.dataVault)
  try {
    const deletion = await db.query(query, [req.dataVault.itinerary.itnry_id]);
    console.log(deletion.rows[0])
    req.dataVault.itinerary = deletion.rows[0]

    if (req.dataVault.itinerary) {
        console.log("Itinerary deleted from the database");
    } else {
      return next(itnryController.createErr({
        //  SERVER MESSAGES
        method: 'deleteItnry',
        type: 'The data to delete was non-existant',
        //  CLIENT MESSAGES    
        message: 'Attempted to delete non-existant data.',
        statusCode: 404,
      }))
    }
    return next();

  } catch (err) {

    return next(itnryController.createErr({
      //  SERVER MESSAGES
      err,
      method: 'deleteItnry',
      type: `Something, other than non-existant data, went wrong on delete attempt.  Error: ${err.message}`,
      //  CLIENT MESSAGES    
      message: 'Something went wrong on delete attempt.',
    }));
  }
}

  // retrieveAll - To retrieve all trips saved for a specific user
itnryController.retrieveAll = (req, res, next) => {
  Itinerary.find({
    "email": req.body.email,
  })
    .then (result => {
      // console.log(result);
      res.locals.allTrips = result;
      console.log("All trips retrieved - retrieveAllTrips middleware");
      return next();
    })
    .catch (err => {
      console.log("could not retrieve all trips - retrieveAllTrips middleware");
      console.error("retrieveAllTrips ERROR =>", err);
    })
}

module.exports = itnryController;
