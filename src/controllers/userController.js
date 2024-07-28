const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const loginUser = async (req, res) => {
    try {
      // Logic for user login
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};