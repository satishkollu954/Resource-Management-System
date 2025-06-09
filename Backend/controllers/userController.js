const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

// inserting user
const createUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, Address, Mobile, Photo } =
      req.body;
    const hashedPassword = await bcrypt.hash(Password, 12);
    const user = new User({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
      Address,
      Mobile,
      Photo,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log("There is an error", err);
    res.status(500).json({ message: "server error" });
  }
};

// getting all users for forget password
const resetPassword = async (req, res) => {
  const user = req.body;
  try {
    const userData = await User.findOne({ Email: user.Email });

    if (!userData) return res.status(404).json({ message: "User not found" });
    if (userData.FirstName !== user.FirstName) {
      return res.status(401).json({ message: "Invalid First Name" });
    }

    const hashedPassword = await bcrypt.hash(user.NewPassword, 12);
    userData.Password = hashedPassword; // Update the password
    console.log("Updated Password:", userData.Password);
    console.log("User Data Before Save:", userData);
    userData.save(); // Save the updated user data
    console.log("User Data After Save:", userData);

    return res.status(200).json({
      message: "Password reset successfully",
      user: userData,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "server error" });
  }
};

//login user data
const loginUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.log("Login Error", err);
    res.status(500).json({ message: "Server error" });
  }
};

//getting all users excluding login user
const getUserExcludingLoginUser = async (req, res) => {
  try {
    const email = req.params.email;
    //console.log(email);
    const users = await User.find({ Email: { $nin: email } });
    // console.log("users", users); // Exclude the logged-in user
    res.status(200).json(users);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//Pasword updating
const updateUser = async (req, res) => {
  try {
    const { Email, FirstName, Password } = req.body;

    console.log("Received data:", req.body);

    const user = await User.findOneAndUpdate(
      { Email, FirstName },
      { $set: { Password } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or FirstName mismatch" });
    }

    console.log("Password updated for:", user.Email);
    res.status(200).json(user);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// get users by email
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ Email: email }); // Assuming the field is `Email`
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//update user by email
const updateUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { Email: email },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// delete user by email
const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ Email: email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Deleted user:", deletedUser);
    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  resetPassword,
  loginUser,
  updateUser,
  getUserByEmail,
  updateUserByEmail,
  deleteUser,
  getUserExcludingLoginUser,
};
