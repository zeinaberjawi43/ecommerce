const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { validateReview } = require('../middlewares/reviewMiddleware');

// Route to create a new review
router.post('/addreviews', validateReview, reviewController.createReview);

// Route to get all reviews
router.get('/getreviews', reviewController.getAllReviews);

// Route to get a single review by ID
router.get('/getreview/:id', reviewController.getReviewById);

// Route to update a review by ID
router.put('/updatereview/:id', validateReview, reviewController.updateReviewById);

// Route to delete a review by ID
router.delete('/deletereview/:id', reviewController.deleteReviewById);

module.exports = router;
