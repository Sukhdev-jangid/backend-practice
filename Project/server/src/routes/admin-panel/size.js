const express = require('express');
const { createsize,
    readsize,
    deletesize,
    updatesizeStatus,
    deletesizes,
    readupdatesize,
    updatesize,
    Activesize } = require('../../controllers/controller');

const sizeRouter = express.Router();
sizeRouter.post('/insert-size', createsize);
sizeRouter.get('/read-size', readsize);
sizeRouter.put('/update-status/:_id', updatesizeStatus);
sizeRouter.delete('/delete-size/:_id', deletesize);
sizeRouter.post('/delete-sizes', deletesizes);
sizeRouter.get('/read-updatesize/:_id', readupdatesize);
sizeRouter.put('/update-size/:_id', updatesize);
sizeRouter.get('/active-sizes', Activesize);

module.exports = sizeRouter;