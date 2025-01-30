const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategory');
const multer = require('multer');
const sizeRouter = require('./admin-panel/size');
const AddcolorRouter = require('./admin-panel/color');
const productCategoryRouter = require('./admin-panel/productCategory');
const multerStorage = require('../middleware/multer');
const adminRouter = require('./admin-panel/admin');
const productRouter = require('./admin-panel/product');
const parentCategoryRouterWeb = require('./website/parentCategory');
const productRouterWeb = require('./website/product');
const userRouter = require('./website/user');
const cartRouter = require('./website/cart');

const adminPanelRouter = express.Router();
const websiteRouter = express.Router();
const appRouter =  express.Router();

adminPanelRouter.use('/parent-category',multer().none(),parentCategoryRouter);
adminPanelRouter.use('/size',multer().none(),sizeRouter);
adminPanelRouter.use('/color',multer().none(),AddcolorRouter);
adminPanelRouter.use('/product-category',multerStorage('product-category'),productCategoryRouter);
adminPanelRouter.use('/admin',multerStorage('admin'),adminRouter);
adminPanelRouter.use('/products',multerStorage('product'),productRouter);

websiteRouter.use('/parent-category',parentCategoryRouterWeb);
websiteRouter.use('/products',productRouterWeb);
websiteRouter.use('/user',userRouter);
websiteRouter.use('/cart',cartRouter);

module.exports = {
    adminPanelRouter,
    websiteRouter,
    appRouter
}