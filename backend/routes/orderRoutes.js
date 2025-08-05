// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// ✅ @route   POST /api/orders/place
// ✅ @desc    Place a new order
// ✅ @access  Public
router.post('/place', async (req, res) => {
  try {
    const { cartItems, shippingInfo, totalAmount, userId } = req.body;

    console.log("📦 Received order from frontend:", req.body);

    // Validation
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (
      !shippingInfo ||
      !shippingInfo.name ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.zip ||
      !shippingInfo.country
    ) {
      return res.status(400).json({ message: 'Please fill all billing/shipping fields' });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: 'Total amount is missing' });
    }

    const order = new Order({
      user: userId || null,  // Optional if no auth
      cartItems,
      shippingInfo,
      totalAmount,
    });

    const savedOrder = await order.save();
    console.log("✅ Order saved to database");

    res.status(201).json({
      message: 'Order placed successfully!',
      orderId: savedOrder._id,
      order: savedOrder,
    });

  } catch (err) {
    console.error('❌ Order Error:', err.message);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});


// ✅ @route   GET /api/orders/user/:userId
// ✅ @desc    Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    console.error('❌ Fetch Orders Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
});

module.exports = router;


