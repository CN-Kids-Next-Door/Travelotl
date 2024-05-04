// CREATE ERR FOR GLOBAL ERROR HANDLER (SEE createError for factor function)
const createErr = (
  { controller,            // ARG OF CONTROLLER.*         (Server side only)
    method,                // ARG OF          *.METHOD    (Server side only)
    type,                  // ARG OF "SMALL DESCRIPTION"  (Server side only)
    err,                   // ERR Object if provided      (Server side only)
    customMessage,         // ARG OF "SMALL DESCRIPTION"  (Sent to frontend)
    customStatus = null    // ARG of "STATUS CODE"        (Sent to frontend)
  }
) => {

  // USE CUSTOM MESSAGE IF IT EXISTS
  const message = customMessage || `Error occurred in ${controller}.${method}. Check server logs for more details.`;

  // USE DEFAULT ERRORLOG IF NONE PROVIDED
  const errorLog = err ? `${typeof err === 'object' ? JSON.stringify(err) : err}` : 'Default error.  No additional error information';

  // ERROR OBJECT
  let errorObject = {
    log: `${controller}.${method} ${type}: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: message }
  };

  // STATUS ONLY RETURN IF NOT NULL
  if (customStatus !== null) {
    errorObject.status = customStatus;
  }

  return errorObject;
};

// CREATE ERROR FACTORY (THIS IS WHAT IS CALLED FROM CONTROLLERS, ETC)
function createError( controllerName ) {
  return function({ method, type, message, statusCode, err = null }) {
      return createErr({
        controller: controllerName,
        method: method,
        type: type,
        customMessage: message,
        customStatus: statusCode,
        err: err
      });
  }
}

// GLOBAL ERROR HANDLER
const globalErrorHandler = ( err, req, res, next ) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error ${JSON.stringify(err, null, 2)}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
};

// DEFAULT (404) ERROR HANDLER
const defaultErrorHandler = ( req, res ) => {
  return res.status(404).send('Not Found');
}

module.exports = { 
  createErr, 
  globalErrorHandler, 
  defaultErrorHandler,
  createError,
 };