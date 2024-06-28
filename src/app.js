import bodyParser from 'body-parser';
import express from 'express';
import signUpRouter from './routes/signUp.js';
import signInRouter from './routes/signIn.js';
import authenticate from './middlewares/authenticate.js';

const app = express();

app.use(bodyParser.json());
app.use(signUpRouter);
app.use(signInRouter);
app.use(authenticate);

export default app;