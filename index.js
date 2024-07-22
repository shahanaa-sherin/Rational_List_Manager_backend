const express = require("express");
const app = express();
require("dotenv").config();
const mongodb = require("./Config/Config");
const cors = require('cors');
const routers = require('./Routes/Routes')

const port = 3000;

app.use(cors())

app.use(express.json());

app.use('/',routers)

// server will only run when the mongodb is connected

mongodb().then(()=>{
    app.listen(port,()=>{
        console.log(`server is now running on ${port}`)
    })
})
