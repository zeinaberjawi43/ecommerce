const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // other fields in your review schema

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);
