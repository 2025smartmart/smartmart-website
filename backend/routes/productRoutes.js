const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require('../models/Product');

// Controllers
const {
  getAllProducts,
  getFeaturedProducts,
  addProduct,
  addCategory,
  getAllCategories
} = require('../controllers/product/productController');

// ✅ Search must come before /:id
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.q;
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
});

// ✅ Add product
router.post('/add-product', upload.single('image'), addProduct);

// ✅ Add category
router.post('/add-category', addCategory);
router.get('/categories', getAllCategories);

// ✅ Get all products (public)
router.get('/', getAllProducts);

// ✅ Get featured products
router.get('/featured', getFeaturedProducts);

// ✅ Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;








