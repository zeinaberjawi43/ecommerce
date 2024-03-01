const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validatePayment } = require('../middlewares/paymentMiddleware');

// Route to create a new payment
router.post('/payments', validatePayment, paymentController.createPayment);

// Route to get all payments
router.get('/payments', paymentController.getAllPayments);

// Route to get a single payment by ID
router.get('/payments/:id', paymentController.getPaymentById);

// Route to update a payment by ID
router.put('/payments/:id', paymentController.updatePaymentById);

// Route to delete a payment by ID
router.delete('/payments/:id', paymentController.deletePaymentById);

module.exports = router;
