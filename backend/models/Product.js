const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
   description: String,
  price: { type: Number, required: true },
  image: { type: String, required: true },
   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isFeatured: { type: Boolean, default: false },

  
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
