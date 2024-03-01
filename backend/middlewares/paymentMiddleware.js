const Payment = require("../models/payment");
const OrderDetail = require("../models/orderDetail");

const validatePayment = async (req, res, next) => {
  const { userID, orderID, amount, paymentMethod } = req.body;

  // Check if required fields are provided
  if (!userID || !orderID || !amount || !paymentMethod) {
    return res.status(400).json({ error: "UserID, OrderID, Amount, and PaymentMethod are required" });
  }

  try {
    // Check if the order detail exists
    const orderDetail = await OrderDetail.findById(orderID);
    if (!orderDetail) {
      return res.status(404).json({ error: "Order detail not found" });
    }

    // Check if the amount is valid
    if (amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }

    // If all validations pass, move on to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  validatePayment,
};
