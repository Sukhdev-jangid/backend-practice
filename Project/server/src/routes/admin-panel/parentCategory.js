const express = require('express');
const { createParentCategory,
    readcategories,
    updatecategoryStatus,
    deleteparentcategory,
    deleteparentcategories,
    readParentcategory,
    updateParentcategory, 
    Activeparentcategory} = require('../../controllers/controller');

const parentCategoryRouter = express.Router();

parentCategoryRouter.post('/insert-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readcategories);
parentCategoryRouter.put('/update-status/:_id', updatecategoryStatus);
parentCategoryRouter.delete('/delete-category/:_id', deleteparentcategory);
parentCategoryRouter.post('/delete-categories', deleteparentcategories);
parentCategoryRouter.get('/read-category/:_id', readParentcategory);
parentCategoryRouter.put('/update-category/:_id', updateParentcategory);
parentCategoryRouter.get('/active-category',Activeparentcategory);

module.exports = parentCategoryRouter