const SubtotalOrder = require('../models/SubtotalOrder');

// Controller to create a new subtotal order
exports.createSubtotalOrder = async (req, res) => {
  try {
    const { userID, totalAmount } = req.body;

    // Create a new subtotal order
    const subtotalOrder = new SubtotalOrder({
      userID,
      totalAmount
    });

    // Save the subtotal order to the database
    await subtotalOrder.save();

    res.status(201).json({ message: 'Subtotal order created successfully', subtotalOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all subtotal orders
exports.getAllSubtotalOrders = async (req, res) => {
  try {
    // Retrieve all subtotal orders from the database
    const subtotalOrders = await SubtotalOrder.find();

    res.status(200).json(subtotalOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single subtotal order by ID
exports.getSubtotalOrderById = async (req, res) => {
  try {
    const subtotalOrderId = req.params.id;

    // Retrieve the subtotal order by ID from the database
    const subtotalOrder = await SubtotalOrder.findById(subtotalOrderId);

    if (!subtotalOrder) {
      return res.status(404).json({ message: 'Subtotal order not found' });
    }

    res.status(200).json(subtotalOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a subtotal order by ID
exports.updateSubtotalOrderById = async (req, res) => {
  try {
    const subtotalOrderId = req.params.id;
    const { userID, orderDate, status, totalAmount } = req.body;

    // Check if the subtotal order exists
    const subtotalOrder = await SubtotalOrder.findById(subtotalOrderId);
    if (!subtotalOrder) {
      return res.status(404).json({ message: 'Subtotal order not found' });
    }

    // Update the subtotal order
    subtotalOrder.userID = userID;
    subtotalOrder.orderDate = orderDate;
    subtotalOrder.status = status;
    subtotalOrder.totalAmount = totalAmount;

    // Save the updated subtotal order to the database
    await subtotalOrder.save();

    res.status(200).json({ message: 'Subtotal order updated successfully', subtotalOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a subtotal order by ID
exports.deleteSubtotalOrderById = async (req, res) => {
  try {
    const subtotalOrderId = req.params.id;

    // Delete the subtotal order from the database
    await SubtotalOrder.findByIdAndDelete(subtotalOrderId);

    res.status(200).json({ message: 'Subtotal order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
