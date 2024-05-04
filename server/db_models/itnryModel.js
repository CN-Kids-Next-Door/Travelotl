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

// HEALTH CHECK (PER 5 MIN)
setInterval(() => {
    pool.query('SELECT 1', (err, res) => {
        if (err) {
            console.error('SQL-(HEALTH): Health check failed:', err);
        } else {
            console.log('SQL-(HEALTH): Health check successful');
        }
    });
}, 300000);

// SESSION DELETION (PER 20 MIN)
const sessionCleanupInterval = cleanupInterval || 1200000;
setInterval(() => {
  const query = 'DELETE FROM sessions WHERE timestamp < NOW() - INTERVAL \'5 minutes\'';
  pool.query(query, (err, res) => {
      if (err) {
          console.error('SQ-(SESSION CLEANUP): Session cleanup failed:', err);
      } else {
          console.log('SQL-(SESSION CLEANUP): Session cleanup successful', res.rowCount, 'rows deleted');
      }
  });
}, sessionCleanupInterval);

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
};