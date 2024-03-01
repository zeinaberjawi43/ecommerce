const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);
