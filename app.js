import bodyParser from 'body-parser';
import express from 'express';
import pingRouter from './routes/ping.js';
import signUpRouter from './routes/signUp.js';

const app = express();

app.use(bodyParser.json());
app.use(pingRouter);
app.use(signUpRouter);

export default app;