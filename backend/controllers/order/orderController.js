const Order = require('../models/orderModel');

const placeOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, totalAmount, userId } = req.body;

    if (!cartItems.length || !shippingInfo.name || !totalAmount) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const newOrder = new Order({
      user: userId || null,  // if user is logged in, you can send their ID
      cartItems,
      shippingInfo,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    console.error('Order Error:', err.message);
    res.status(500).json({ message: 'Something went wrong while placing order' });
  }
};

module.exports = { placeOrder };
