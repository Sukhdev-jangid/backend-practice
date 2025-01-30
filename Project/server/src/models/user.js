const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    email:String
},
{
    timestamps:true,
    versionKey:false
});

const User = mongoose.model('users',userSchema);

module.exports = User;