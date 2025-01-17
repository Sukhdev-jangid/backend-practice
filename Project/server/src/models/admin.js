const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        name: String,
        facebook: String,
        instagram: String,
        youtube: String,
        twitter: String,
        thumbnail: String,
        logo: String,
        footer_logo: String,
        favicon: String,
        email: String,
        password: String
    },
    {
        timestamps: true
    }
);

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;