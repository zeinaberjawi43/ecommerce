const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');
const { validateOrderDetail } = require('../middlewares/orderDetailMiddleware');

// Route to create a new order detail
router.post('/add-order-details', validateOrderDetail, orderDetailController.createOrderDetail);

// Route to get all order details for a specific order
router.get('/get-order-details/:orderId', orderDetailController.getOrderDetailsByOrderId);

// Route to update an order detail by ID
router.put('/update-order-details/:id', orderDetailController.updateOrderDetailById);

// Route to delete an order detail by ID
router.delete('/delete-order-details/:id', orderDetailController.deleteOrderDetailById);

module.exports = router;
