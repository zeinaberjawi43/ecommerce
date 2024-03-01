const User = require('../models/user');
const bcrypt = require('bcrypt');

// Controller to create a new user
exports.createUser = async (req, res) => {
  try {
    const { role, firstname, lastname, password, email } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      role,
      firstname,
      lastname,
      password: hashedPassword,
      email
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve the user by ID from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role, firstname, lastname, email } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user
    user.role = role;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
