import express from 'express';
import { signUp, userExists } from '../services/authentication.js';

const router = express.Router();

router.post('/sign-up',async (req,res)=>{
    const userPayload = req.body;

    const userAlreadyExists = await userExists(userPayload.email);

    if(userAlreadyExists){
        res.status(409).send({ message: 'User Already exists' });
        return;
    }

    await signUp(userPayload);
    res.status(200).send({ message: 'Registration Successful', data: { email: userPayload.email } });

    return;
});

export default router;