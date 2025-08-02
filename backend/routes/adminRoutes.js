const express = require('express');
const router = express.Router();
const path = require('path');

const {
  addProduct,
  deleteProduct,
  getAllProducts,
} = require('../controllers/admin/adminController');

const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// ✅ Route: Add Product (with Image Upload)
router.post(
  '/add-product',
  protect,
  adminOnly,
  upload.single('image'),
  addProduct
);

// ✅ Route: Get All Products (with pagination or filtering)
router.get('/products', protect, adminOnly, getAllProducts);
router.post('/add-product', protect, adminOnly, upload.single('image'), addProduct);

// ✅ Route: Delete Product by ID
router.delete('/products/:id', protect, adminOnly, deleteProduct);

module.exports = router;




