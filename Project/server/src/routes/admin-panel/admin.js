const express = require('express');
const { adminLogin, updateAdmin, genrateOtp, updateCreadintials } = require('../../controllers/controller');

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin);
adminRouter.put('/update-admin/:_id',updateAdmin);
adminRouter.post('/genrate-otp',genrateOtp);
adminRouter.post('/update-creadintials',updateCreadintials)


module.exports = adminRouter;