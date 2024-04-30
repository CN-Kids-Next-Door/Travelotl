// import { Pool } from 'pg';

// //test to creck connection
// describe('Postgres DB Connection', () => {
//     itnryModel('should establish a successful pg db connection', async () => {
//         //create new pool
//         const pool = new Pool({
//             user: 'my_username',
//             password: 'my_password',
//             host: 'localhost',
//             port: 5432,
//             database: 'our_database',
//         });

//         //attempt to connect
//         const client = await pool.connect();

//         //should be truthy if connection works
//         expect(client).toBeTruthy();

//         //release connection
//         client.release();
//     })
// })