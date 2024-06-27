import express from "express";

const router = express.Router();

router.get('/ping',(req,res)=>{
    console.log('ping');
    res.status(200).send({});
});

export default router;