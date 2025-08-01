const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/user/userSignUp");
const userSignIN = require("../controllers/user/userLogIn");
const userLogout = require("../controllers/user/userLogOut");
const authMiddleware = require("../middleware/authMiddleware");
const productController = require("../controllers/product/productController");

// User routes
router.post("/signup", userController.createUser);
router.get("/user", userController.getAllUsers);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-users/:id", userController.deleteUser);

router.post("/login", userSignIN);            // User login
router.get("/logout", userLogout);            // User logout

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: "Welcome to protected route", user: req.user });
});

// Product routes
router.get("/products/featured", productController.getFeaturedProducts);

module.exports = router;


