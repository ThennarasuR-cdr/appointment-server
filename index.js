import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app.js';

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;


mongoose.connect(dbUrl).then(()=>{
    console.log("Connection to DB successful");
}).catch((err)=>{
    console.log("Error connecting to DB", err);
});

app.listen(port, () => {
    console.log("App listening on PORT: ",port);
});