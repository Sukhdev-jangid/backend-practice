const express = require('express');
const { createCheckout } = require('../../controllers/controller');

const orderRouter = express.Router();

orderRouter.post('/create-checkout',createCheckout);

module.exports = orderRouter;