const Product = require('../../models/Product');


// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true });
    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch featured products', error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, isFeatured } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      isFeatured,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  addProduct,
};


