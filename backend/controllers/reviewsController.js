const Review = require('../models/reviews');

// Controller to create a new review
exports.createReview = async (req, res) => {
  try {
    const { user } = req.body;

    // Create a new review
    const review = new Review({
      user
    });

    // Save the review to the database
    await review.save();

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    // Retrieve all reviews from the database
    const reviews = await Review.find();

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Retrieve the review by ID from the database
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a review by ID
exports.updateReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { user } = req.body;

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the review
    review.user = user;

    // Save the updated review to the database
    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a review by ID
exports.deleteReviewById = async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Delete the review from the database
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
