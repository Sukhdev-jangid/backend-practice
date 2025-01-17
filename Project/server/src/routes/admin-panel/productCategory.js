const express = require('express');
const { createProductCategory, getproductCategories, updatePcategoryStatus, updatePcategoryFeatured, deletePcategory, deleteproductcategories } = require('../../controllers/controller');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/insert-category',createProductCategory);
productCategoryRouter.get('/read-categories',getproductCategories);
productCategoryRouter.put('/update-status/:_id',updatePcategoryStatus);
productCategoryRouter.put('/update-featured/:_id',updatePcategoryFeatured);
productCategoryRouter.delete('/delete-category/:_id',deletePcategory);
productCategoryRouter.post('/delete-categories',deleteproductcategories);

module.exports = productCategoryRouter;