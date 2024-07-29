const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

/**
 * User registration
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    const registerDate = new Date();
    logger.info(`User registered: ${newUser.username} , Date: ${registerDate}`);
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error(`Error regiregisteringstering user ${newUser.username}: ${error.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * User login
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the username exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ username: existingUser.username }, 'your_secret_key_here', { expiresIn: '1h' });
    const loggedDate = new Date();
    logger.info(`User ${existingUser.username} Logged In at ${loggedDate}`);
    return res.status(200).json({ token });
  } catch (error) {
    logger.error('Error Occurred when user logging in!!');
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * User profile management
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;
    // Update the user's username
    await User.updateOne({ username }, { username: newUsername });
    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile
};