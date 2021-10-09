const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 80;

global.__basedir = __dirname;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE']
      })
)

app.use(cookieParser());

const signRouter = require("./routes/sign")
const googleRouter = require("./routes/google")
const restaurantRouter = require("./routes/restaurant")
const mypageRouter = require("./routes/mypage");

app.use("/sign", signRouter)
app.use("/google", googleRouter)
app.use("/restaurant", restaurantRouter)
app.use("/mypage", mypageRouter)

app.get('/',(req,res)=>{
    res.status(201).send('hello world');
})

app.listen( port ,()=>{
    console.log('server running');
})