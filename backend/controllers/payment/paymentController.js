const Razorpay = require("razorpay");
require("dotenv").config();
const Payment = require("../../models/Payment");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
exports.createOrder = async (req, res) => {
    try {
        console.log("📩 Received createOrder request:", req.body);
        console.log("🔑 Using Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);

        const { amount, currency } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const options = {
            amount: Number(amount) * 100, // Convert to paise
            currency: currency || "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        console.log("🛠 Creating Razorpay Order with options:", options);

        const order = await razorpay.orders.create(options);

        console.log("✅ Razorpay Order created:", order);

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });
    } catch (error) {
        console.error("❌ Razorpay Order Error (full):", error);
        res.status(500).json({
            error: "Order creation failed",
            message: error?.error?.description || error.message
        });
    }
};

// Save payment after successful transaction
exports.savePayment = async (req, res) => {
    try {
        console.log("📩 Received savePayment request:", req.body);

        const { orderId, paymentId, amount, currency, status } = req.body;

        if (!orderId || !paymentId || !amount) {
            return res.status(400).json({ error: "Missing payment details" });
        }

        const payment = new Payment({ orderId, paymentId, amount, currency, status });
        await payment.save();

        console.log("💾 Payment saved:", payment);

        res.json({ success: true, payment });
    } catch (error) {
        console.error("❌ Payment save failed:", error);
        res.status(500).json({ error: "Payment save failed" });
    }
};

