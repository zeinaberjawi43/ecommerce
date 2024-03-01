const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { validateCart } = require('../middlewares/cartMiddleware');

// Route to create a new cart item
router.post('/addtocart', validateCart, cartController.createCartItem);

// Route to get all cart items for a specific user
router.get('/getcart/:userId', cartController.getCartItemsByUserId);

// Route to update a cart item by ID
router.put('/updatecart/:id', cartController.updateCartItemById);

// Route to delete a cart item by ID
router.delete('/deletecart/:id', cartController.deleteCartItemById);

module.exports = router;
