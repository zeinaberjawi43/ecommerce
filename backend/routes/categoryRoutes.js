const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { validateCategory } = require('../middlewares/categoryMiddleware');

// Route to create a new category
router.post('/addcategories', validateCategory, categoryController.createCategory);

// Route to get all categories
router.get('/getallcategories', categoryController.getAllCategories);

// Route to get a single category by ID
router.get('/getcategories/:id', categoryController.getCategoryById);

// Route to update a category by ID
router.put('/updatecategories/:id', categoryController.updateCategoryById);

// Route to delete a category by ID
router.delete('/deletecategories/:id', categoryController.deleteCategoryById);

module.exports = router;
