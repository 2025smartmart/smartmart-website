const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/user/userSignUp");
const userSignIN = require("../controllers/user/userLogIn");
const userLogout = require("../controllers/user/userLogOut");
const productController = require("../controllers/product/productController");



// Register new user
router.post("/signup", userController.createUser);


router.get("/users", userController.getAllUsers);

// Update user info (Admin only or self)
router.put("/update-user/:id", userController.updateUser);

// Delete user (Admin only)
router.delete("/delete-user/:id", userController.deleteUser);

// Login & Logout
router.post("/login", userSignIN);
router.get("/logout", userLogout);

// User profile (Protected route)
router.get("/profile", (req, res) => {
  res.json({ message: "Welcome to protected route", user: req.user });
});

// -------------------- PRODUCT ROUTES --------------------

// Public: Get featured products

router.get("/products/featured", productController.getFeaturedProducts);

// (You can add more product routes here if needed...)

module.exports = router;



