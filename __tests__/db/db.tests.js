const { Pool } = require('pg');
require('dotenv').config();

let pool;

beforeAll(() => {
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

    pool = new Pool({
        user,
        database,
        password,
        port,
        host,
        max,
        idleTimeoutMillis,
        connectionTimeoutMillis
    })
})

beforeAll(done => {
    done()
})


afterAll(() => {
    pool.end();
})

//test to creck connection
describe('Postgres DB Connection', () => {
    //it block
    it('should successfully connect to db with correct info', async () => {

        const client = await pool.connect();

        expect(client).toBeTruthy();

        client.end();
    })
})

//it block
