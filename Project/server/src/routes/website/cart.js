const express = require('express');
const { creatCart, readCart, updateCart, deleteCartItem } = require('../../controllers/controller');

const cartRouter = express.Router();

cartRouter.post('/add-cart',creatCart);
cartRouter.get('/read-cart/:user',readCart);
cartRouter.put('/update-cart/:_id',updateCart);
cartRouter.delete('/delete-cart/:_id',deleteCartItem);

module.exports = cartRouter;