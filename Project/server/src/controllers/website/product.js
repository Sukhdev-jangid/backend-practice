const Product = require("../../models/product");

const productByParentCategory = async(req,res)=>{
    try{
        const data = await Product.find({
            parentCategory:req.params.id,
            status:true
        })
        .populate('sizes')
        .populate('colors');
        const filepath = `${req.protocol}://${req.get('host')}/frank-and-oak-files/products/`;
        res.status(200).json({message:'success',data,filepath})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
};

module.exports={
    productByParentCategory
}