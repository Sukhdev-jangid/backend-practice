const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async (req, res) => {
   try{
    const data = new ParentCategory(req.body);
    const response = await data.save();
    res.status(200).json({message:'success',data:response});
   }
   catch(error){
    console.log(error);
    if(error.code === 11000 && error.keyPattern.name===1) return res.status(400).json({message:'category already exist'});
    res.status(500).json({message:'internal server error'});
   }
};

const readcategories = async(req,res)=>{
   try{
      const data = await ParentCategory.find();
      res.status(200).json({message:'success',data});
   }
   catch(error){
      console.log(error);
      res.status(500).json({message:'internal server error'});
   }
};

const updatecategoryStatus = async(req,res)=>{
   try{
      const data = await ParentCategory.updateOne(
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

const deleteparentcategory = async(req,res)=>{
   try{
      const data = await ParentCategory.deleteOne(req.params);
      res.status(200).json({message:'success',data});
   }
   catch(error){
      console.log(error);
      res.status(500).json({message:'internal server error'});
   }
};

const deleteparentcategories = async(req,res)=>{
   try{
      const data = await ParentCategory.deleteMany({_id:{$in:req.body.ids}});
      res.status(200).json({message:'success',data});
   }
   catch(error){
      console.log(error);
      res.status(500).json({message:'internal server error'});
   }
};

const readParentcategory = async(req,res)=>{
         try{
            const data = await ParentCategory.findOne(req.params);
            res.status(200).json({message:'success',data});
         }
         catch(error){
            console.log(error);
            res.status(500).json({message:'internal server error'});
         }
};

const updateParentcategory = async(req,res)=>{
   try{
      const data = await ParentCategory.updateOne(
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

const Activeparentcategory = async(req,res)=>{
   try{
      const data = await ParentCategory.find({status:true});
      res.status(200).json({message:'success',data});
   }
   catch(error){
      console.log(error);
      res.status(500).json({message:'internal server error'});
   }
}

module.exports = {
   createParentCategory,
   readcategories,
   deleteparentcategory,
   updatecategoryStatus,
   deleteparentcategories,
   readParentcategory,
   updateParentcategory,
   Activeparentcategory
}