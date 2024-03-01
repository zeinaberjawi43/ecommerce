const Cart = require('../models/cart');

// Controller to create a new cart item
exports.createCartItem = async (req, res) => {
  try {
    const { userID, productID, quantity, price, subtotal } = req.body;

    // Create a new cart item
    const cartItem = new Cart({
      userID,
      productID,
      quantity,
      price,
      subtotal
    });

    // Save the cart item to the database
    await cartItem.save();

    res.status(201).json({ message: 'Cart item created successfully', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all cart items for a specific user
exports.getCartItemsByUserId = async (req, res) => {
  try {
    const userID = req.params.userId;

    // Retrieve all cart items for the specified user from the database
    const cartItems = await Cart.find({ userID });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a cart item by ID
exports.updateCartItemById = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity, price, subtotal } = req.body;

    // Check if the cart item exists
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the cart item
    cartItem.quantity = quantity;
    cartItem.price = price;
    cartItem.subtotal = subtotal;

    // Save the updated cart item to the database
    await cartItem.save();

    res.status(200).json({ message: 'Cart item updated successfully', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a cart item by ID
exports.deleteCartItemById = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    // Delete the cart item from the database
    await Cart.findByIdAndDelete(cartItemId);

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
