const express = require('express');
const masterRouter = require('./src/app');
require('dotenv').config();
require('./src/db/config');
const cors = require('cors');

const app = express();
const {PORT} = process.env;

app.use(cors());
app.use(express.json());

app.use('/api',masterRouter);

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT} `);
});

// http://localhost:4400/api/admin-panel/parent-category/insert-category
//http://localhost:4400/api/admin-panel/size/insert-size
//http://localhost:4400/api/admin-panel/color/add-color