const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const url = 'mongodb+srv://jangidsukhdev70:UB5F7CKSUa5j9x73@sukhdev0.zz0fj.mongodb.net/ws_130_tmp?retryWrites=true&w=majority&appName=sukhdev0';
mongoose.connect(url)
    .then(() => {
        console.log('connect to database');
    })
    .catch(err => {
        console.log(err.message);
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
            const name = req.body.name.split(' ');
            cb(null, name[0] + Date.now() + Math.floor(Math.random() * 99999) + path.extname(file.originalname));
        }
    })
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]);

app.use('/product-files', express.static('./files'));

app.post('/create-product', uploads, async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.images) data.images = req.files.images.map((image) => image.filename);
        }

        const dataTosave = new product(data);
        const response = await dataTosave.save();
        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'internal server error' });
    }
});

app.get('/read-products', async (req, res) => {
    try {
        const products = await product.find();
        const filepath = `${req.protocol}://${req.get('host')}/product-files/`

        const data = products.map((product) => {
            const predata = product._doc;
            return {
                ...predata,
                thumbnail: filepath + predata.thumbnail,
                images: predata.images.map((image) => filepath + image)
            }
        }
        );
        res.status(200).json({ message: 'success', data, filepath });
    }
    catch (error) {
        console.log(error.massage);
        res.status(500).json({ message: 'internal sever error' });
    }
});

app.delete('/delete-products/:_id',async(req,res)=>{
    try{
        const predata = await product.findOne(req.params);

        if(!predata) return res.status(404).json({message:'match not found'});

        const data = await product.deleteOne(req.params);

        if(predata.thumbnail){
            if(fs.existsSync(`./files/${predata.thumbnail}`)) fs.unlinkSync(`./files/${predata.thumbnail}`);
        };

        if(predata.images){
            predata.images.map((img)=>{
                if(fs.existsSync(`./files/${img}`)) fs.unlinkSync(`./files/${img}`);
            })
        };

        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'internal sever error'});
    }
});

app.put('/updata-product/:_id', uploads,async(req,res)=>{
    try{
        const predata = await product.findOne(req.params);
        console.log(predata);
        if(!predata) return res.status(404).json({message:'no match found'});

        const data = req.body;
        console.log(data);

        if(req.files){
            if(req.files.thumbnail){
                if(fs.existsSync(`./files/${predata.thumbnail}`))fs.unlinkSync(`./files/${predata.thumbnail}`);
                data.thumbnail = req.files.thumbnail[0].filename;
            }
            if(req.files.images){
                predata.images.map((img)=>{
                    if(fs.existsSync(`./files/${img}`)) fs.unlinkSync(`./files/${img}`);
                });
            data.images = req.files.images.map((img)=>img.filename);
            }
        };

        const response = await product.updateOne(
            req.params,
            {
                $set:data
            }
        );
        res.status(200).json({message:'success',data:response});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'internal server error'});
    }
})

app.listen(4400, () => {
    console.log('server running on port 4400');
});