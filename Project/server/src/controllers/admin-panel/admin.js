const Admin = require("../../models/admin");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const otpStorage = {};

const createAdmin = async (req, res) => {
    try {
        const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

        const data = await Admin.find();

        if (data.length > 0) return console.log(data[0]);

        bcrypt.hash(ADMIN_PASSWORD, 10, async (error, hashed) => {
            console.log(error);

            const dataToSave = new Admin({
                email: ADMIN_EMAIL,
                password: hashed
            });

            const response = await dataToSave.save();
            console.log(response);
        })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
};

const adminLogin = async (req, res) => {
    try {

        if (!req.body.email || !req.body.password) return res.status(400).json({ message: "Please provide email and password both" });

        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) return res.status(404).json({ message: "Admin not found"});
        const { password, ...adminWithoutPassword } = admin._doc;

        const filepath = `${req.protocol}://${req.get('host')}/arowai-streetwear-files/`;

        bcrypt.compare(req.body.password, admin.password, (error, result) => {
            if (error) return res.status(500).json({ message: error.message });
            if (!result) return res.status(401).json({ message: "password does not match" });
            res.status(200).json({ message: "Admin logged in successfully", data: adminWithoutPassword, filepath });
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
};

const updateAdmin = async (req, res) => {
    try {
        const data = req.body;

        if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        if (req.files.logo) data.logo = req.files.logo[0].filename;
        if (req.files.favicon) data.favicon = req.files.favicon[0].filename;
        if (req.files.footer_logo) data.footer_logo = req.files.footer_logo[0].filename;

        const response = await Admin.updateOne(
            req.params,
            {
                $set: data
            }
        );
        res.status(200).json({ message: 'success' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const genrateOtp = async (req, res) => {
    try {
        const adminData = await Admin.find();
        const { email } = adminData[0]._doc;

        const otp = Math.floor(Math.random() * 1000000);

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
            subject: 'OTP for admin',
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

const updateCreadintials = async (req, res) => {
    try {
        const { userotp, newemail, newpassword, email } = req.body;

        if (!userotp) return res.status(200).json({ message: 'please sent otp' });

        const sentotp = otpStorage[email];

        if (sentotp != userotp) return res.status(400).json({ message: 'invalid otp' });

        const data = {};

        if(newemail) data.email = newemail;
        if(newpassword) {
            bcrypt.hash(newpassword, 10, async (error, hashed) => {
                if(error) return res.status(500).json({ message: error.message });

                data.password = hashed

                await Admin.updateOne({email:email},{$set:data});
                res.status(200).json({ message: 'success' });
                
            })
        }

       
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateCreadintials
}