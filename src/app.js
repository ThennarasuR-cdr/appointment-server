import bodyParser from 'body-parser';
import express from 'express';
import signUpRouter from './routes/signUp.js';

const app = express();

app.use(bodyParser.json());
app.use(signUpRouter);

export default app;