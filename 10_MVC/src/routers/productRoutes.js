const express = require('express');
const uploads = require('../middleware/multer');
const product = require('../models/product');
const { createproduct, readproduct, deleteproduct, updateproduct } = require('../controllers/productController');

const productRouter = express.Router();
productRouter.use(uploads);

productRouter.post('/create-product', createproduct );

productRouter.get('/read-products', readproduct );

productRouter.delete('/delete-products/:_id', deleteproduct);

productRouter.put('/updata-product/:_id', updateproduct);

module.exports = productRouter;