const User = require("../models/users");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error during signin", error });
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { signup, login, logout };
