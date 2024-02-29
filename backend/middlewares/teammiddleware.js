const Employee = require("../models/team");

// Middleware to validate if all required fields are provided
const validateRequiredFields = (req, res, next) => {
  const { name, image, position } = req.body;

  if (!name || !image || !position) {
    return res.status(400).json({ error: "All fields are required" });
  }

  next();
};

// Middleware to validate if the name already exists
const validateNameExists = async (req, res, next) => {
  const { name } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ name });

    // If updating and the name exists for a different employee, return an error
    if (existingEmployee && existingEmployee._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ error: "Employee with the same name already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  next();
};

module.exports = {
  validateRequiredFields,
  validateNameExists,
};
