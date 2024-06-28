import express from 'express';
import User from '../models/user.js';
import { issueToken } from '../services/token.js';

const router = express.Router();

router.post('/sign-in',async (req,res)=>{
    const { email, password } = req.body;
    
    const user = await User.findOne({email});

    if (!user) {
		res.status(404).send({ message: 'User not found' });
		return;
	}

    if (user.password === password) {
		const token = issueToken({ email });

		res.status(200).send({ message: 'Success', data: { token: token } });
		console.log('Login success');
		return;
	}

    console.log('Login failed: Wrong password');
	res.status(401).send({ message: 'Failure' });
	return;
});

export default router;