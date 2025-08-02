const Product = require('../../models/ProductModel');

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Check required fields
    if (!name || !price || !category || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    // Create new product with image
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: req.file.filename, // this is where multer stores the file name
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error('Add Product Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: err.message,
    });
  }
};



// ✅ Delete Product by ID (Admin Only)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    console.error('Delete Product Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: err.message,
    });
  }
};

// ✅ Get All Products with Pagination (Admin)
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    console.error('Get Products Error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: err.message,
    });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
};


