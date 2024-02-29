const Payment = require("../models/payment");

// Controller function to create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    
    // Create a new payment document using the Payment model
    const payment = new Payment({
      name,
      price,
      quantity
    });

    // Save the payment document to the database
    await payment.save();

    res.status(201).json({ message: "Payment created successfully" });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update a payment
exports.updatePayment = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    // Find the payment by ID and update its fields
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { name, price, quantity },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment updated successfully", payment });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
