const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser } = require('../middlewares/userMiddleware');

// Route to create a new user
router.post('/adduser', validateUser, userController.createUser);

// Route to get all users
router.get('/getusers', userController.getAllUsers);

// Route to get a single user by ID
router.get('/getuser/:id', userController.getUserById);

// Route to update a user by ID
router.put('/updateuser/:id', validateUser, userController.updateUserById);

// Route to delete a user by ID
router.delete('/deleteuser/:id', userController.deleteUserById);

module.exports = router;
