// Load environment variables early
require('dotenv').config();

// Core imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

// Local modules
const router = require('./routes/router'); 
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1); // Exit if DB connection fails
});

// API Routes
app.use("/api", router);                // Auth + User routes
app.use("/api/admin", adminRoutes);     // Admin product/category routes
app.use("/api/products", productRoutes); // Public product routes

app.use('/uploads', express.static('uploads'));


// Server Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});


