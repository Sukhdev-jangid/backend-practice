const express = require('express');
const { genrateOtpUser, registerUser, verifyUserAuth } = require('../../controllers/controller');

const userRouter = express.Router();

userRouter.post('/genrate-otp',genrateOtpUser);
userRouter.post('/register-user',registerUser);
userRouter.post('/verify-user',verifyUserAuth);

module.exports = userRouter;  
