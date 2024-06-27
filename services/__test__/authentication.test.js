import User from "../../models/user";
import { signUp } from "../authentication";

jest.mock("../../models/user",()=> ({
    create: jest.fn(),
    findOne: jest.fn()
}));

describe('Authentication service', () => { 
    describe('Sign up', () => { 
        beforeEach(() => {
			jest.clearAllMocks();
		});

        const mockCreate = User.create;
        const mockFindOne = User.findOne;
        
        it('should create a new user when the email id is not present in db', async ()=>{
            mockFindOne.mockResolvedValue(null);

            await signUp({name: "TestUser", email: "test@gmail.com", password: "12345"});

            expect(mockFindOne).toHaveBeenCalledWith({"email": "test@gmail.com"});
            expect(mockCreate).toHaveBeenCalledWith({
                "email": "test@gmail.com",
                "name": "TestUser",
               "password": "12345",
            });
        });

        it("should not create a user when the email is already present in DB", async ()=>{
            mockFindOne.mockResolvedValue({
                "email": "test@gmail.com",
                "name": "TestUser",
               "password": "12345",
            });

            await signUp({name: "User245", email: "test@gmail.com", password: "56789"});

            expect(mockFindOne).toHaveBeenCalledWith({"email": "test@gmail.com"});
            expect(mockCreate).not.toHaveBeenCalled();
        });
    });

})