const { default: mongoose } = require("mongoose");

const productshema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    thumbnail: String,
    images: Array,
    instock: {
        type: Boolean,
        default: true
    }
});

const product = mongoose.model('products', productshema);

module.exports = product;