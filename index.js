import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import pingRouter from './routes/ping.js';

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

const app = express();

app.use(pingRouter);

mongoose.connect(dbUrl);

app.listen(port, () => {
    console.log("App listening on PORT: ",port);
});