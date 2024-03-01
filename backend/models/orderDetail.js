const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
    orderDetailID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
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
    }
});

module.exports = mongoose.model('OrderDetail', orderDetailsSchema);
