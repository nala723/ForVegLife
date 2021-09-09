const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']
      })
)

app.use(cookieParser());

const userRouter = require("./routes/user")
const googleRouter = require("./routes/google")
const placeRouter = require("./routes/place")
const mypageRouter = require("./routes/mypage")

app.use("/user", userRouter)
app.use("/google", googleRouter)
app.use("/place", placeRouter)
app.use("/mypage", mypageRouter)

app.get('/',(req,res)=>{
    res.status(201).send('hello world');
})

app.listen(port,()=>{
    console.log('server running');
})