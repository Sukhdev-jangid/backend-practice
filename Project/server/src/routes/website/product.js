const express = require('express');
const { productByParentCategory } = require('../../controllers/controller');

const productRouterWeb = express.Router();

productRouterWeb.get('/read-products-by-parent/:id',productByParentCategory);

module.exports=productRouterWeb;