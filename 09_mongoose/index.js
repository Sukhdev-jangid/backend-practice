const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const url = 'mongodb+srv://jangidsukhdev70:UB5F7CKSUa5j9x73@sukhdev0.zz0fj.mongodb.net/ws_130_tmp?retryWrites=true&w=majority&appName=sukhdev0';
mongoose.connect(url)
    .then(() => {
        console.log('connect to database');
    })
    .catch(err => {
        console.log(err.massage);
    })

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

const uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'files');
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name + Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
        }
    })
}).fields([
    {name:'thumbnail',maxCount:1},
    {name:'images',maxCount:10}
]);

app.post('/create-product',uploads, async(req, res) => {
    try {
        const data = req.body;
        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if(req.files.images) data.images = req.files.images.map((image)=> image.filename);
        }
        
        const dataTosave  = new product(data);
        const response = await dataTosave.save();
        res.status(200).json({ massage: 'success', data:response});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ massage: 'internal server error' });
    }
})

app.listen(4400, () => {
    console.log('server running on port 4400');
});