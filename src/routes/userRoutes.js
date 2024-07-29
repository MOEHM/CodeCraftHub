const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * POST route to register a new user
 */
router.post('/register', userController.registerUser);

/**
 * POST route to login a user
 */
router.post('/login', userController.loginUser);

/**
 * PUT route to update user profile based on username
 */
router.put('/:username', userController.updateUserProfile);

/**
 * GET route to fetch users
 */
// router.get('/all_users', )

module.exports = router;