const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategory');
const multer = require('multer');
const sizeRouter = require('./admin-panel/size');
const AddcolorRouter = require('./admin-panel/color');

const adminPanelRouter = express.Router();
const websiteRouter = express.Router();
const appRouter =  express.Router();

adminPanelRouter.use('/parent-category',multer().none(),parentCategoryRouter);
adminPanelRouter.use('/size',multer().none(),sizeRouter);
adminPanelRouter.use('/color',multer().none(),AddcolorRouter);

module.exports = {
    adminPanelRouter,
    websiteRouter,
    appRouter
}