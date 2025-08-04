const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getAllProducts,
  getFeaturedProducts,
  addProduct,
  addCategory
} = require('../controllers/product/productController');

// Add product (with image upload)
router.post('/add-product', upload.single('image'), addProduct);

// Add category
router.post('/add-category', addCategory);

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);

module.exports = router;






