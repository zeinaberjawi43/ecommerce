const User = require("../models/user");

const validateUser = async (req, res, next) => {
  const { role, firstname, lastname, password, email } = req.body;

  // Check if required fields are provided
  if (!role || !firstname || !lastname || !password || !email) {
    return res.status(400).json({ error: "Role, Firstname, Lastname, Password, and Email are required" });
  }

  // If all validations pass, move on to the next middleware or controller
  next();
};

module.exports = {
  validateUser,
};
