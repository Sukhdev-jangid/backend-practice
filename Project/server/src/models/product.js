const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        shortDescription: String,
        thumbnail: String,
        secondaryThumbnail: String,
        gallery: [String],
        price: Number,
        mrp: Number,
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'parent_categories'
        },
        productCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product_categories'
        },
        stock:{
            type:Boolean,
            default:true
        },
        brand:String,
        sizes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'sizes'
            }
        ],
        colors:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'colors'
            }
        ],
        status:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
);

const Product = mongoose.model('products',productSchema);

module.exports = Product;