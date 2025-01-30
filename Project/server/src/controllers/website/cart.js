const Cart = require("../../models/card");

const creatCart = async (req, res) => {
    try {
        const preData = await Cart.findOne(req.body);
        if (preData) {
            const response = await Cart.updateOne(
                { _id: preData._id },
                {
                    $set: {
                        quantity: (req.body.quantity) ? req.body.quantity + preData.quantity : preData.quantity + 1
                    }
                }
            );
            return res.status(200).json({ message: 'success', data: response });
        }

        const data = new Cart(req.body);
        const response = await data.save();
        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
};

const readCart = async(req,res)=>{
    try{
        const response = await Cart.find(req.params);
        const filepath = `${req.protocol}://${req.get('host')}/frank-and-oak-files/products/`;
        res.status(200).json({message:'success',data:response,filepath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

module.exports = {
    creatCart,
    readCart
}