// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // in INR
  originalPrice: { type: Number }, // MRP in INR
  discount: { type: Number },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String },
  assured: { type: Boolean, default: false },
  exchangeOffer: { type: String },
  codAvailable: { type: Boolean, default: true }, // Cash on Delivery availability
  emiAvailable: { type: Boolean, default: true }, // EMI options
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);