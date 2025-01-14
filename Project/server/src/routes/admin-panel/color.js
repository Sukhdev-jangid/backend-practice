const express = require('express');
const { Addcolor, readcolors, deletecolor, updatecolorStatus, deletecolors, readcolor, updatecolor } = require('../../controllers/controller');


const AddcolorRouter = express.Router();

AddcolorRouter.post('/add-color',Addcolor);
AddcolorRouter.get('/read-colors',readcolors);
AddcolorRouter.put('/update-status/:_id',updatecolorStatus);
AddcolorRouter.delete('/delete-color/:_id',deletecolor);
AddcolorRouter.post('/delete-colors',deletecolors);
AddcolorRouter.get('/read-color/:_id',readcolor);
AddcolorRouter.put('/update-color/:_id',updatecolor);

module.exports = AddcolorRouter;