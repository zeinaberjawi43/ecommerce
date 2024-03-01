const Cart = require("../models/cart");
const Product = require("../models/product");

const validateCart = async (req, res, next) => {
  const { userID, productID, quantity } = req.body;

  // Check if required fields are provided
  if (!userID || !productID || !quantity) {
    return res.status(400).json({ error: "UserID, ProductID, and Quantity are required" });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the quantity is valid
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    // Calculate subtotal
    const subtotal = product.price * quantity;

    // If all validations pass, set the subtotal in the request body and move on to the next middleware or controller
    req.body.subtotal = subtotal;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  validateCart,
};
