jest.mock('./mockModel');

const { getUsersController } = require('./UserController');
const db = require('./mockModel');

beforeAll(done => {
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

    //it should be able to login in a user by comparing info

    //it should be able to register a user by adding to the database
})