const express = require('express');
const { createsize, readsize, deletesize, updatesizeStatus } = require('../../controllers/controller');

const sizeRouter = express.Router();
sizeRouter.post('/insert-size',createsize);
sizeRouter.get('/read-size',readsize);
sizeRouter.put('/update-status/:_id',updatesizeStatus);
sizeRouter.delete('/delete-size/:_id',deletesize);

module.exports = sizeRouter;