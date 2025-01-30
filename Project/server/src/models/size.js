const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    sizeorder:Number,
    status:{
        type:Boolean,
        default:true
    },
    createdAt:Date,
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

sizeSchema.pre('save',function(){
    this.updatedAt = Date.now;
});
sizeSchema.pre('insertOne',function(){
    this.updatedAt = Date.now;
});
sizeSchema.pre('insertMany',function(){
    this.updatedAt = Date.now;
});

const Size = mongoose.model('sizes',sizeSchema);

module.exports = Size;