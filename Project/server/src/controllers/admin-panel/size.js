const Size = require("../../models/size");

const createsize = async(req,res)=>{
    try{
        const data = new Size(req.body);
        const response = await data.save();
        res.status(200).json({message:'succes',data:response});
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern.size===1) return res.status(400).json({message:'category already exist'});
        res.status(500).json({message:'internal sever error'});
    }
};

const readsize = async(req,res)=>{
    try{
        const data = await Size.find();
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const updatesizeStatus = async(req,res)=>{
    try{
        const data = await Size.updateOne(
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

const deletesize = async(req,res)=>{
    try{
        const data = await Size.deleteOne(req.params);
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'})
    }
};

const deletesizes = async(req,res)=>{
    try{
        const data = await Size.deleteMany({_id:{$in:req.body.ids}});
        res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const readupdatesize = async(req,res)=>{
    try{
        const data = await Size.findOne(req.params);
        res.status(200).json({message:'success',data});
     }
     catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
     }
};

const updatesize = async(req,res)=>{
    try{
        const data = await Size.updateOne(
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

module.exports = {
    createsize,
    readsize,
    updatesizeStatus,
    deletesize,
    deletesizes,
    readupdatesize,
    updatesize
};
