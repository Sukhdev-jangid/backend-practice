const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:String,
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

categorySchema.pre('save',function(){
    this.updatedAt = Date.now;
});
categorySchema.pre('insertOne',function(){
    this.updatedAt = Date.now;
});
categorySchema.pre('insertMany',function(){
    this.updatedAt = Date.now;
});

const ParentCategory = mongoose.model('parent_categories',categorySchema);

module.exports = ParentCategory