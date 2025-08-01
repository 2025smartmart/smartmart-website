const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

// ✅ Create User
const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // 1️⃣ Basic validation
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create and save user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role: "user", // ✅ Better to use lowercase and match schema enum
    });

    const savedUser = await user.save();

    // 5️⃣ Remove password before sending response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({
      data: userWithoutPassword,
      message: "User created successfully",
      success: true,
      error: false,
    });

  } catch (err) {
    console.error("Signup Error:", err); // ✅ Log real error to terminal
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};

// ✅ Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 }); // hide password
    res.status(200).json({
      data: users,
      message: "Users fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Get Users Error:", err);
    res.status(500).json({
      message: err.message || "Failed to fetch users",
      success: false,
      error: true,
    });
  }
};

// ✅ Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;

    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(400).json({
          message: "Email already in use",
          success: false,
          error: true,
        });
      }
      updateData.email = email;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      data: userWithoutPassword,
      message: "User updated",
      success: true,
      error: false,
    });

  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({
      message: err.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const { password: _, ...userWithoutPassword } = deletedUser.toObject();

    res.status(200).json({
      data: userWithoutPassword,
      message: "User deleted",
      success: true,
      error: false,
    });

  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({
      message: err.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};



