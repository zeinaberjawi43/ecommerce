const OrderDetail = require("../models/orderDetail");
const Product = require("../models/Product");

const validateOrderDetail = async (req, res, next) => {
  const { orderID, productID, quantity } = req.body;

  // Check if required fields are provided
  if (!orderID || !productID || !quantity) {
    return res.status(400).json({ error: "OrderID, ProductID, and Quantity are required" });
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

    // If all validations pass, move on to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  validateOrderDetail,
};
