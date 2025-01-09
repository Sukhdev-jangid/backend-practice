const express = require('express');
const { createParentCategory, readcategories, updatecategoryStatus, deleteparentcategory, deleteparentcategories } = require('../../controllers/controller');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/insert-category',createParentCategory);
parentCategoryRouter.get('/read-category',readcategories);
parentCategoryRouter.put('/update-status/:_id',updatecategoryStatus);
parentCategoryRouter.delete('/delete-category/:_id',deleteparentcategory);
parentCategoryRouter.post('/delete-categories',deleteparentcategories);

module.exports = parentCategoryRouter