const Product = require("../../models/product");

const createProduct = async (req, res) => {
    try {
        const data = req.body;

        if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        if (req.files.secondaryThumbnail) data.secondaryThumbnail = req.files.secondaryThumbnail[0].filename;
        if (req.files.gallery) data.gallery = req.files.gallery.map((img) => img.filename);

        const dataToSave = new Product(data);

        const response = await dataToSave.save();
        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        const filepath = `${req.protocol}://${req.get('host')}/arowai-streetwear-files/`;
        res.status(200).json({
            message: "success", data: products, filepath
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const updateProductStatus = async (req, res) => {
    try {
        const data = await Product.updateOne(
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

const deleteProduct = async (req, res) => {
    try {
        const preData = await Product.findOne(req.params);
        if (!preData) return res.status(404).json({ message: 'match not found' });

        const data = await Product.deleteOne(req.params);

        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProductStatus,
    deleteProduct
}