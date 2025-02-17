const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        products: Object,
        customerId: String,
        totalAmt: Number,
        totaltems: Number,
        status: {
            type: String,
            enum: ['pending', 'accepted', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        payment: {
            type: String,
            enum: ['cash','card','netbanking'],
            default:'card'
        },
        paymentStatus:{
            type:String,
            enum: ['pending','success','failed'],
            default:'pending'
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

const Order = mongoose.model('orders',orderSchema);

module.exports = Order;