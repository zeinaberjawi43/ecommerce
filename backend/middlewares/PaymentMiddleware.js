const Payment = require("../models/payment");

// Middleware to check if payment exists
exports.checkPaymentExists = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    req.payment = payment;
    next();
  } catch (error) {
    console.error("Error checking payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware to validate payment data
exports.validatePaymentData = (req, res, next) => {
  const { name, price, quantity } = req.body;
  if (!name || !price || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  // Additional validation logic can be added here
  next();
};

// Middleware to authorize payment actions
exports.authorizePayment = (req, res, next) => {
  // Example: Check if the user has permission to perform payment actions
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};

// Middleware to log payment-related requests
exports.logPaymentRequest = (req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path}`);
  next();
};
