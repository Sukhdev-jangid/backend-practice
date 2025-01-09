const express = require('express');
const { Addcolor, readcolors, deletecolor, updatecolorStatus } = require('../../controllers/controller');


const AddcolorRouter = express.Router();

AddcolorRouter.post('/add-color',Addcolor);
AddcolorRouter.get('/read-colors',readcolors);
AddcolorRouter.put('/update-status/:_id',updatecolorStatus);
AddcolorRouter.delete('/delete-color/:_id',deletecolor);

module.exports = AddcolorRouter;