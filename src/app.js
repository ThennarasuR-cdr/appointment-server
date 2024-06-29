import bodyParser from 'body-parser';
import express from 'express';
import signUpRouter from './routes/signUp.js';
import signInRouter from './routes/signIn.js';
import appointmentRouter from './routes/appointment.js';
import authenticate from './middlewares/authenticate.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(signUpRouter);
app.use(signInRouter);
app.use(authenticate);
app.use(appointmentRouter);

export default app;