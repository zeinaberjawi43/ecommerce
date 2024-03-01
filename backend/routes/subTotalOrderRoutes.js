const express = require('express');
const router = express.Router();
const subtotalOrderController = require('../controllers/subTotalOrderController');
const { validateSubtotalOrder } = require('../middlewares/subTotalOrderMiddleware');

// Route to create a new subtotal order
router.post('/add-subtotal-orders', validateSubtotalOrder, subtotalOrderController.createSubtotalOrder);

// Route to get all subtotal orders
router.get('/get-subtotal-orders', subtotalOrderController.getAllSubtotalOrders);

// Route to get a single subtotal order by ID
router.get('/get-subtotal-order/:id', subtotalOrderController.getSubtotalOrderById);

// Route to update a subtotal order by ID
router.put('/update-subtotal-order/:id', validateSubtotalOrder, subtotalOrderController.updateSubtotalOrderById);

// Route to delete a subtotal order by ID
router.delete('/delete-subtotal-order/:id', subtotalOrderController.deleteSubtotalOrderById);

module.exports = router;
