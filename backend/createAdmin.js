const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/userModel');

// Load env variables
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("DB connection error:", err));

// Create admin user
const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'smartmart@gmail.com' });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin2025', 10);
    const admin = new User({
      name: 'Admin',
      email: 'smartmart@gmail.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log(' Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error(' Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
