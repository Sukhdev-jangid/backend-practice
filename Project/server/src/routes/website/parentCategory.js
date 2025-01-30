const express = require('express');
const { activeParentCategoryWeb } = require('../../controllers/controller');

const parentCategoryRouterWeb = express.Router();

parentCategoryRouterWeb.get('/read-categories',activeParentCategoryWeb);

module.exports = parentCategoryRouterWeb;