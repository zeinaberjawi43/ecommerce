const Payment = require('../models/payment');

// Controller to create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { userID, orderID, amount, paymentDate, paymentMethod } = req.body;

    // Create a new payment
    const payment = new Payment({
      userID,
      orderID,
      amount,
      paymentDate,
      paymentMethod
    });

    // Save the payment to the database
    await payment.save();

    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all payments
exports.getAllPayments = async (req, res) => {
  try {
    // Retrieve all payments from the database
    const payments = await Payment.find();

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Retrieve the payment by ID from the database
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a payment by ID
exports.updatePaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const { userID, orderID, amount, paymentDate, paymentMethod } = req.body;

    // Check if the payment exists
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update the payment
    payment.userID = userID;
    payment.orderID = orderID;
    payment.amount = amount;
    payment.paymentDate = paymentDate;
    payment.paymentMethod = paymentMethod;

    // Save the updated payment to the database
    await payment.save();

    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a payment by ID
exports.deletePaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;

    // Delete the payment from the database
    await Payment.findByIdAndDelete(paymentId);

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
