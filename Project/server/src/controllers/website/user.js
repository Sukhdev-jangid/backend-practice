const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const jwtKey = 'jwt130';

const otpStorage = {};

const genrateOtpUser = async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(Math.random() * 1000000);
        console.log(otp);
        otpStorage[email] = otp;

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USERMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const option = {
            from: process.env.USERMAIL,
            to: email,
            subject: 'OTP for register',
            text: `your OTP is ${otp}`,
        };

        transport.sendMail(option, (error, info) => {
            if (error) return res.status(500).json({ message: error.message })
            res.status(200).json({ message: 'otp sent' })
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { otp, firstname, lastname, email, password } = req.body;

        if (!otp) return res.status(200).json({ message: 'please sent otp' });
        const sentotp = otpStorage[email];

        console.log(otp,sentotp);
        if (sentotp != otp) return res.status(400).json({ message: 'invalid otp' });

        const data = {};


        bcrypt.hash(password, 10, async (error, hashed) => {
            if (error) return res.status(500).json({ message: error.message });

            const data = new User({
                firstname,
                lastname,
                email,
                password: hashed
            });

            const response = await data.save();

            const { password, ...userData } = response._doc;

            jwt.sign(userData,jwtKey,{expiresIn:'8d'},(error,auth)=>{
                if(error) return res.status(500).json({message:error.message});
                res.status(200).json({ message: 'success',auth });
            })
        })



    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const verifyUserAuth = async(req,res)=>{
    try{
        const auth = req.headers.authorization.split(' ')[1];
        
        jwt.verify(auth,jwtKey,(error,data)=>{
            if(error) return res.status(401).json({message:'invalid token'});
            res.status(200).json({message:'success',data});
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    genrateOtpUser,
    registerUser,
    verifyUserAuth,
}