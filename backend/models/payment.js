const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const Service = mongoose.model("Payment", paymentSchema);

module.exports = Service;