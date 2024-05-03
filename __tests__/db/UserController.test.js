jest.mock('./mockModel');

const { getUsersController } = require('./UserController');
const db = require('./mockModel');
const request = require('supertest');
const app = require('../../server/server.js');


afterAll(done => {
    done()
})

//practicing with some test examples i found online to help guide me for next tests
describe('getUsersController', () => {
    it('should return all users in db', async () => {
        const mockUsers = [{"userInfo": { "email": "test@test.com", "username": "iamuser", "password": "password", "firstName": "name", "lastName": "last"}, "token": "NOTOKEN"}]
        db.query.mockResolvedValue(mockUsers);

        const req = {}; //mock req obj
        const res = {
            json: jest.fn(),
        }; //mock res obj with jest function

        await getUsersController(req, res);

        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors', async () => {
        db.query.mockRejectedValue(new Error('Database error'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getUsersController(req, res);

        expect(res.status).toHaveBeenLastCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch users' });
    });
})

//http request tests
describe('POST to /auth/login', () => {
    //it should be able to login in a user by comparing info
    it('should login a user by comparing password in db and return user info obj', async () => {
        const userData = [{"userInfo": { "email": "test@test.com", "username": "iamuser", "password": "password", "firstName": "name", "lastName": "last"}, "token": "NOTOKEN"}];

        const req = {username: 'iamuser', password: 'password'};
       
        const response = await request(app)
            .post('/auth/login')
            .send(req);


        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

        const user = response.body.user;
        console.log('user:', user);
        expect(user.username).toBe(req.username)
        expect(user.password).toBe(req.password)

        
    })
})
    

    //it should be able to register a user by adding to the database
    /*const userDataInDB = await db.query('SELECT * FROM users WHERE username = $1;', [userData.userInfo.username]);
        expect(usersInDatabase.rows.length).toBe(1);
        expect(usersInDatabase.rows[0].userInfo.email).toBe(userData.userInfo.email); */