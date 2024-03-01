const Category = require("../models/category");

const validateCategory = async (req, res, next) => {
  const { name, description } = req.body;

  // Check if required fields are provided
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required" });
  }

  try {
    // Check if the category name already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category with the same name already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }

  // If all validations pass, move on to the next middleware or controller
  next();
};

module.exports = {
  validateCategory,
};
