const ProductCategory = require("../../models/productCategory");

const createProductCategory = async (req, res) => {
    try {
      
        const data = req.body;
        if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        const datatosave = new ProductCategory(data);
        const savedData = await datatosave.save();
        res.status(200).json({ message: 'success', data: savedData });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const getproductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find().sort({ createdAt: -1 });
        const filepath = `${req.protocol}://${req.get('host')}/frank-and-oak-files/`;
        res.status(200).json({
             message: "success", data: productCategories,filepath
         });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

const updatePcategoryStatus = async(req,res)=>{
    try{
        const data = await ProductCategory.updateOne(
            req.params,
            {
               $set:req.body
            }
         );
         res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};


const updatePcategoryFeatured = async(req,res)=>{
    try{
        const data = await ProductCategory.updateOne(
            req.params,
            {
               $set:req.body
            }
         );
         res.status(200).json({message:'success',data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

module.exports = {
    createProductCategory,
    getproductCategories,
    updatePcategoryStatus,
    updatePcategoryFeatured
};