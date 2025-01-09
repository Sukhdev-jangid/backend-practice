const AddColor = require("../../models/color");

const Addcolor = async (req, res) => {
    try {
        console.log(req.body);
        const data = new AddColor(req.body);
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
        const data = await AddColor.find();
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const updatecolorStatus = async(req,res)=>{
    try{
       const data = await AddColor.updateOne(
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
        const data = await AddColor.deleteOne(req.params);
        res.status(200).json({ message: 'success', data });
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
    deletecolor
};