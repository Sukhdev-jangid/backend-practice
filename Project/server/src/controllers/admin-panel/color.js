const ColorModel = require("../../models/color");

const Addcolor = async (req, res) => {
    try {
        const data = new ColorModel(req.body);
        const response = await data.save();
        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern.color === 1) return res.status(400).json({ message: 'color already exist' });
        res.status(500).json({ message: 'internal server error' });
    }
};

const readcolors = async (req, res) => {
    try {
        const data = await ColorModel.find();
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const updatecolorStatus = async(req,res)=>{
    try{
       const data = await ColorModel.updateOne(
          req.params,
          {
             $set:req.body
          }
       );
       res.status(200).json({message:'success',data});
    }
    catch(error){
       console.log(error);
       res.status(500).json({message:'internal server error'});
    }
 };

const deletecolor = async (req, res) => {
    try {
        const data = await ColorModel.deleteOne(req.params);
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const deletecolors = async(req,res)=>{
    try{
        const data = await ColorModel.deleteMany({_id:{$in:req.body.ids}});
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const readcolor = async(req,res)=>{
    try{
        const data = await ColorModel.findOne(req.params);
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const updatecolor = async(req,res)=>{
    try{
        const data = await ColorModel.updateOne(
            req.params,
            {$set:req.body}
        );
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const activeColors = async (req, res) => {
    try {
        const data = await ColorModel.find({status:true});
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    Addcolor,
    readcolors,
    updatecolorStatus,
    deletecolor,
    deletecolors,
    readcolor,
    updatecolor,
    activeColors
};