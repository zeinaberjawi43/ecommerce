const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middlewares/productMiddleware');

// Route to create a new product
router.post('/addproducts', validateProduct, productController.createProduct);

// Route to get all products
router.get('/getproducts', productController.getAllProducts);

// Route to get a single product by ID
router.get('/getproduct/:id', productController.getProductById);

// Route to update a product by ID
router.put('/updateproduct/:id', validateProduct, productController.updateProductById);

// Route to delete a product by ID
router.delete('/deleteproduct/:id', productController.deleteProductById);

module.exports = router;
