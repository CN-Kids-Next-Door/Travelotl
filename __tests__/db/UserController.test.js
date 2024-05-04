jest.mock('./mockModel');

const { getUsersController } = require('./UserController');
const db = require('./mockModel');
const request = require('supertest');
const app = require('./mockServer');


afterAll(done => {
    done()
})

//testing to make sure database can be accessed
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

// //http request tests
//commented out because they are not complete
// describe('POST to /auth/login', () => {
//     //it should be able to login in a user by comparing info
//     it('should login a user by comparing password in db and return user info obj', async () => {
//         const userData = [{"userInfo": { "email": "test@test.com", "username": "iamuser", "password": "password", "firstName": "name", "lastName": "last"}, "token": "NOTOKEN"}];

//         const reqBody = {email: 'test@test.com', password: 'password', username: 'iamuser', roles: 'user'};
       
//         const response = await request(app)
//             .post('/auth/login')
//             .send(reqBody);

//         console.log('this is response:', response.body)


//         expect(response.status).toBe(200);
//         expect(response.body).toBeDefined();

//         const user = response.body.user;
//         console.log('user:', user);
//         expect(user.email).toBe(userData[0].userInfo.email)
//         expect(user.password).toBe(userData[0].userInfo.password)

        
//     })
// })
    