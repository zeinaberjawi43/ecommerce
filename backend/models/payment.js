const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orderDetail",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
