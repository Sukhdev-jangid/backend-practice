const express = require('express');
const { creatCart, readCart } = require('../../controllers/controller');

const cartRouter = express.Router();

cartRouter.post('/add-cart',creatCart);
cartRouter.get('/read-cart/:user',readCart);

module.exports = cartRouter;