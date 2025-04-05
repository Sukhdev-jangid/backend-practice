const Order = require('../../models/order');

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createCheckout = async (req, res) => {
    try {
        console.log(req.body);

        const lineItem = req.body.cart.map((product, index) => (
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.product.name,
                        description: product.product.shortDescription,
                        // images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS9r1ARsIuYZF-I4r7Vu6JrtTWU1JWJN6Yeg&s']
                    },
                    unit_amount: product.product.price * 100
                },
                quantity: product.quantity
            }
        ));

        const { firstname, lastname, phone, ...address } = req.body.userData;

        const customer = await stripe.customers.create({
            name: firstname + lastname,
            address
        });

        const dataToSave = new Order({
            user:req.body.cart[0].user._id,
            products:lineItem,
            customerId:customer.id,
        });

        const savedOrder = await dataToSave.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItem,
            mode: 'payment',
            success_url: `http://localhost:3000/payment-success/${savedOrder._id}`,
            cancel_url: `http://localhost:3000/payment-failed/${savedOrder._id}`,
            customer: customer.id
        });

        console.log(session);

        res.status(200).json({ message: "success", sessionId: session.id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = createCheckout