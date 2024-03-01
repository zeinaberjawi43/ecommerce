const OrderDetail = require('../models/orderDetail');

// Controller to create a new order detail
exports.createOrderDetail = async (req, res) => {
  try {
    const { orderID, productID, quantity, price } = req.body;

    // Create a new order detail
    const orderDetail = new OrderDetail({
      orderID,
      productID,
      quantity,
      price
    });

    // Save the order detail to the database
    await orderDetail.save();

    res.status(201).json({ message: 'Order detail created successfully', orderDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all order details for a specific order
exports.getOrderDetailsByOrderId = async (req, res) => {
  try {
    const orderID = req.params.orderId;

    // Retrieve all order details for the specified order from the database
    const orderDetails = await OrderDetail.find({ orderID });

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update an order detail by ID
exports.updateOrderDetailById = async (req, res) => {
  try {
    const orderDetailId = req.params.id;
    const { quantity, price } = req.body;

    // Check if the order detail exists
    const orderDetail = await OrderDetail.findById(orderDetailId);
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }

    // Update the order detail
    orderDetail.quantity = quantity;
    orderDetail.price = price;

    // Save the updated order detail to the database
    await orderDetail.save();

    res.status(200).json({ message: 'Order detail updated successfully', orderDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete an order detail by ID
exports.deleteOrderDetailById = async (req, res) => {
  try {
    const orderDetailId = req.params.id;

    // Delete the order detail from the database
    await OrderDetail.findByIdAndDelete(orderDetailId);

    res.status(200).json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
