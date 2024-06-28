import request from 'supertest';
import app from '../../app';
import User from '../../models/user';

jest.mock('../../services/token', () => ({
	issueToken: jest.fn().mockReturnValue('validUser-123')
}));
jest.mock('../../models/user',()=>({
    findOne: jest.fn()
}));

describe('Sign In', () => {
	it('should login successfully for valid user', async () => {
		User.findOne.mockResolvedValue({ email: 'validUser', password: '123' });

		const response = await request(app)
			.post('/sign-in')
			.send({ email: 'validUser', password: '123' });

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({ message: 'Success', data: { token: 'validUser-123' } });
	});

	it('should return 404 when user does not exist', async () => {
		User.findOne.mockResolvedValue(null);

		const response = await request(app)
			.post('/sign-in')
			.send({ email: 'invalidUser', password: '123' });

		expect(response.status).toBe(404);
		expect(response.body).toStrictEqual({ message: 'User not found' });
	});

	it('should not login successfully for invalid user', async () => {
		User.findOne.mockResolvedValue({ email: 'invalidUser', password: '123456' });

		const response = await request(app)
			.post('/sign-in')
			.send({ email: 'invalidUser', password: '123' });

		expect(response.status).toBe(401);
		expect(response.body).toStrictEqual({ message: 'Failure' });
	});

});