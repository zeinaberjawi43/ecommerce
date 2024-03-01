const Product = require("../models/product");
const Category = require("../models/category");

const validateProduct = async (req, res, next) => {
  const { name, description, category, rating, image, price, quantity } = req.body;

  // Check if required fields are provided
  if (!name || !description || !category || !rating || !image || !price || !quantity) {
    return res.status(400).json({ error: "Name, Description, Category, Rating, Image, Price, and Quantity are required" });
  }

  try {
    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if the rating (User) exists
    // Assuming you have a User model
    // If not, you might want to remove this check
    // or replace it with the appropriate check for your rating system
    // const existingRating = await User.findById(rating);
    // if (!existingRating) {
    //   return res.status(404).json({ error: "Rating not found" });
    // }

    // Check if the price and quantity are valid
    if (price <= 0 || quantity <= 0) {
      return res.status(400).json({ error: "Price and quantity must be positive numbers" });
    }

    // If all validations pass, move on to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  validateProduct,
};
