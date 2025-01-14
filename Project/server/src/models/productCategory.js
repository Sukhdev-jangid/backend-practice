const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: String,
        slug: {
            type: String,
            unique: true
        },
        thumbnail: String,
        description: String,
        parentCategory: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'parent_categories'
        },
        featured: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps:true
    }

);

const ProductCategory = mongoose.model('product_categories',CategorySchema);

module.exports = ProductCategory;