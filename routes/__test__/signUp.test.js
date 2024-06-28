import request from 'supertest';
import app from '../../app.js';
import { userExists, signUp } from '../../services/authentication.js';

jest.mock('../../services/authentication', ()=>({
    userExists: jest.fn(),
    signUp: jest.fn()
}));

describe('Sign up controller', () => { 
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    const mockUserExists = userExists;
    const mockSignUp = signUp;
    it('should inser the user to DB', async ()=>{
        mockUserExists.mockResolvedValue(false);
        const user = {
            "name": "Thennarasu",
            "email": "test@gmail.com",
            "password":"12345"
        };

        const response = await request(app)
        .post('/sign-up')
        .send(user);

        expect(mockSignUp).toHaveBeenCalledWith(user);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: "Registration Successful", data: { "email": "test@gmail.com" } });
    });

    it('should throw 409 status when a user with same email is already present', async ()=>{
        mockUserExists.mockResolvedValue(true);
        const user = {
            "name": "Thennarasu",
            "email": "test@gmail.com",
            "password":"12345"
        };

        const response = await request(app)
        .post('/sign-up')
        .send(user);

        expect(mockSignUp).not.toHaveBeenCalled();
        expect(response.status).toBe(409);
        expect(response.body).toStrictEqual({ message: "User Already exists"});
    })
})