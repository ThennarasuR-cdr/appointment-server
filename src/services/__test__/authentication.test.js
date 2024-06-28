import User from "../../models/user";
import { signUp, userExists } from "../authentication";

jest.mock("../../models/user",()=> ({
    create: jest.fn(),
    findOne: jest.fn()
}));

describe('Authentication service', () => { 
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockCreate = User.create;
    const mockFindOne = User.findOne;
    
    describe('Sign up', () => { 
        it('should create a new user when the email id is not present in db', async ()=>{
            mockFindOne.mockResolvedValue(null);

            await signUp({name: "TestUser", email: "test@gmail.com", password: "12345"});

            expect(mockCreate).toHaveBeenCalledWith({
                "email": "test@gmail.com",
                "name": "TestUser",
               "password": "12345",
            });
        });
    });

    describe('User exists',()=>{
        it("should return true when the email is already present in DB", async ()=>{
            mockFindOne.mockResolvedValue({
                "email": "test@gmail.com",
                "name": "TestUser",
               "password": "12345",
            });

            const userAlreadyExists = await userExists("test@gmail.com");

            expect(userAlreadyExists).toBeTruthy();
        });

        it("should return false when the email is not present in DB", async ()=>{
            mockFindOne.mockResolvedValue(null);

            const userAlreadyExists = await userExists("test@gmail.com");

            expect(userAlreadyExists).toBeFalsy();
        });
    })
})