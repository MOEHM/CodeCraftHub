const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Create a model based on the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;