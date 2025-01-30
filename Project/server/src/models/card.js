const mongoose = require('mongoose');

const cartShema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
        },
        quantity:{
            type:Number,
            default:1
        },
        color:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'colors',
        },
        size:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'sizes',
        },
    },
    {
        timestamps:true,
        versionKey:false
    }
);

const Cart = mongoose.model('carts',cartShema);

module.exports = Cart;