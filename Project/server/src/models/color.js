const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    code:String,
    createdAt:Date,
    status:{
        type:Boolean,
        default:true
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

colorSchema.pre('save',function(){
    this.updatedAt = Date.now;
});
colorSchema.pre('insertOne',function(){
    this.updatedAt = Date.now;
});
colorSchema.pre('insertMany',function(){
    this.updatedAt = Date.now;
});

const ColorModel = mongoose.model('colors',colorSchema);

module.exports = ColorModel;