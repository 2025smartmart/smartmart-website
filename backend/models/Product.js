const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  category: String,
  
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
