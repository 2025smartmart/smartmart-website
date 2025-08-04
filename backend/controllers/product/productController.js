const Product = require('../../models/Product');
const Category = require('../../models/Category');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category'); // Optional: populate category
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

// Get featured products
const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true }).populate('category');
    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch featured products', error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, isFeatured, category } = req.body;
    let image = '';

    // Handle image from Multer (file upload)
    if (req.file) {
      image = `/uploads/${req.file.filename}`; // Adjust if your upload path differs
    } else if (req.body.image) {
      image = req.body.image;
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      isFeatured: isFeatured === 'true' || isFeatured === true, // handles both string and boolean
      category, // optional field if you add reference in schema
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Optional: prevent duplicate categories
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add category', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  addProduct,
  addCategory
};


