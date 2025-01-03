const product = require("../models/product");
const fs = require('fs');
const path = require('path');

const createproduct = async (req, res) => {
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
};

const readproduct = async (req, res) => {
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
};

const deleteproduct = async(req,res)=>{
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
};

const updateproduct = async(req,res)=>{
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
};

module.exports = {
    createproduct,
    readproduct,
    deleteproduct,
    updateproduct 
}