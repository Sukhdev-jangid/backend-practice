const express = require('express');
const productRouter = require('./src/routers/productRoutes');
require('dotenv').config();
require('./src/db/config');

const app = express();

app.use('/product-files', express.static('./files'));

app.use('/product',productRouter);

app.listen(process.env.PORT, () => {
    console.log('server running on port 4400');
});