const express = require('express');
const { adminLogin, updateAdmin, genrateOtp } = require('../../controllers/controller');

const adminRouter = express.Router();

adminRouter.post('/login',adminLogin);
adminRouter.put('/update-admin/:_id',updateAdmin);
adminRouter.post('/genrate-otp',genrateOtp);


module.exports = adminRouter;