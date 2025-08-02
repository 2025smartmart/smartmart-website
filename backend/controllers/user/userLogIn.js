const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid email or password"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid email or password"
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      process.env.JWT,
      { expiresIn: '3h' }
    );

    // Send token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // secure cookie in production
      sameSite: 'Lax',
      maxAge: 3 * 60 * 60 * 1000 // 3 hours
    });

    // Send response
    res.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong"
    });
  }
};


