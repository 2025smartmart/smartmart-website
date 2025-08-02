const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getFeaturedProducts,
  addProduct,
} = require('../controllers/product/productController');

const upload = require('../middleware/upload')

// Get all products
router.get('/', getAllProducts);

// Get featured products
router.get('/featured', getFeaturedProducts);

// Add new product
router.post('/add-product', addProduct);

module.exports = router;

