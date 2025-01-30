
const express = require('express');
const { createProduct, getProducts, updateProductStatus, deleteProduct } = require('../../controllers/controller');


const productRouter = express.Router();

productRouter.post('/add-product',createProduct );
productRouter.get('/read-product',getProducts);
productRouter.put('/update-status/:_id', updateProductStatus);
productRouter.delete('/delete-product/:_id', deleteProduct);

module.exports = productRouter
