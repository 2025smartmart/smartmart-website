const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

console.log("MONGO_URI from .env:", process.env.MONGO_URI);


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

app.use('/api', authRoutes);

app.use('/api/products/uploads', express.static('uploads'));


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000")
});
