// Load environment variables early
require('dotenv').config();

// Core imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Local modules
const connectdb = require('./config/db');
const router = require('./routes/router'); 
const productRoutes = require("./routes/productRoutes");

// Initialize express app
const app = express();

// Connect to MongoDB
connectdb();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // fallback in case env is missing
    credentials: true
}));

app.use(express.json());

// API Routes
app.use("/api", router);               // User & Auth routes
app.use("/api/products", productRoutes); // Product-related routes

// Server Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

