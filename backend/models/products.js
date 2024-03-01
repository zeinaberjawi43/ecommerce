const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming User model is used for talents
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }

});

const Service = mongoose.model("Product", productSchema);

module.exports = Service;
