import express from 'express';

const app = express();

app.get("/",(req, res)=>{
    res.send("applocation is running...")
});

app.listen(3000,()=>{
    console.log(`server started at port 3000`)
})
