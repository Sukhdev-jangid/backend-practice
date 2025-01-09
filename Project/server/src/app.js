const express = require('express');
const { adminPanelRouter, websiteRouter, appRouter } = require('./routes/routes');

const masterRouter = express.Router();

masterRouter.use('/admin-panel',adminPanelRouter);
masterRouter.use('/website',websiteRouter);
masterRouter.use('/app',appRouter);

module.exports = masterRouter;