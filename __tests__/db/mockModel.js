/*
*   DOCUMENTATION OF SCHEMA AND DB: 
*   https://github.com/CN-Kids-Next-Door/notes-doc/blob/main/sqlReadme.md
*/

const { Pool } = require('pg');

const {
  POSTGRES_USER: user,
  POSTGRES_DB: database,
  POSTGRES_PASSWORD: password,
  POSTGRES_PORT: port,
  POSTGRES_HOST: host,
  POSTGRES_MAX: max,
  POSTGRES_IDLETIMEOUTMILLIS: idleTimeoutMillis,
  POSTGRES_CONNECTIONTIMEOUTMILLIS: connectionTimeoutMillis,
  POSTGRES_SESSION_CLEANUP_INTERVAL: cleanupInterval
} = process.env;

const poolConfig = {
  user,
  database,
  password,
  port,
  host,
  max,
  idleTimeoutMillis,
  connectionTimeoutMillis
};

const pool = new Pool(poolConfig);

pool
// PER CONNECTION LOGGING
  .on('connect', 
    () => {
      console.log(`SQL-(CONNECTION STARTED): Connected to database on host ${host}:${port}`);
    }
  )
// PER CONNECTION ERROR HANDLING FOR UNEXPECTED ISSUES
  .on('error', 
    (err, client) => {
      console.error('SQL-(CONNECTION ERROR): Unexpected error on idle client', err);
      process.exit(-1);
    }
  )
// PER CONNECTION CLOSE MESSAGE
  .on('remove', (client) => {
    console.log('SQL-(CONNECTION ENDED): Client removed from pool');
  }
);

module.exports = {
    query: (text, params, callback) => {
      const start = Date.now();
      console.log(`SQL-(DEBUG): Starting query at ${new Date(start)}.`);
      console.log(`SQL-(DEBUG): SQL Query was: ${text}`);
      return new Promise((resolve, reject) => {
        pool.query(text, params, (err, res) => {
            if (err) {
                console.error(`Query failed: ${text}`, err);
                reject(err);
            } else {
                const duration = Date.now() - start;
                console.log(`Query executed in ${duration}ms`);
                resolve(res);
            }
        });
    });
    }
}