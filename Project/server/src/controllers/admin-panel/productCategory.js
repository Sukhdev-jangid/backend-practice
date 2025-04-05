const ProductCategory = require("../../models/productCategory");
const fs = require('fs');

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
        const filepath = `${req.protocol}://${req.get('host')}/arowai-streetwear-files/`;
        res.status(200).json({
            message: "success", data: productCategories, filepath
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

const updatePcategoryStatus = async (req, res) => {
    try {
        const data = await ProductCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        );
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};


const updatePcategoryFeatured = async (req, res) => {
    try {
        const data = await ProductCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        );
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

const deletePcategory = async (req, res) => {
    try {
        const preData = await ProductCategory.findOne(req.params);
        if (!preData) return res.status(404).json({ message: 'match not found' });

        const data = await ProductCategory.deleteOne(req.params);

        if (preData.thumbnail) {
            if (fs.existsSync(`./src/files/product-category/${preData.thumbnail}`)) fs.unlinkSync(`./src/files/product-category/${preData.thumbnail}`);
        };

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

const deleteproductcategories = async (req, res) => {
    try {
        const preData = await ProductCategory.find({ _id: { $in: req.body.ids } });
        if (!preData) return res.status(404).json({ message: 'match not found' });

        const data = await ProductCategory.deleteMany({ _id: { $in: req.body.ids } });

        preData.map((category, index)=>{
            if (category.thumbnail) {
                if (fs.existsSync(`./src/files/product-category/${category.thumbnail}`)) fs.unlinkSync(`./src/files/product-category/${category.thumbnail}`);
            };
        });

       
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const activeproductCategoriesbyParent = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find({
            parentCategory:req.params.id,
            status:true
        });
        const filepath = `${req.protocol}://${req.get('host')}/arowai-streetwear-files/`;
        res.status(200).json({
            message: "success", data: productCategories, filepath
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

module.exports = {
    createProductCategory,
    getproductCategories,
    updatePcategoryStatus,
    updatePcategoryFeatured,
    deletePcategory,
    deleteproductcategories,
    activeproductCategoriesbyParent
};