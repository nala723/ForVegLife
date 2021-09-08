const express = require('express');
const cors = require(cors);
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']
      })
)

app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(201).send('hello world');
})

app.listen(port,()=>{
    console.log('server running');
})