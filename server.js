const express = require("express");
var cors = require('cors')
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors())
app.use(function (req, res, next) { //allow cross origin requests
    const allowedOrigins = ['http://localhost:4200'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Headers", "Accept,Accept-Language,Content-Language,Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use('/api/todoitem', require('./endpoints/todoitem/todoitem.controller'));

app.listen(process.env.PORT, () => console.log('Server started ' + process.env.PORT));