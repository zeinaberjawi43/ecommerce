const Product = require('../models/Product');

// Controller to create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, rating, image, price, quantity } = req.body;

    // Create a new product
    const product = new Product({
      name,
      description,
      category,
      rating,
      image,
      price,
      quantity
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Retrieve the product by ID from the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, category, rating, image, price, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product
    product.name = name;
    product.description = description;
    product.category = category;
    product.rating = rating;
    product.image = image;
    product.price = price;
    product.quantity = quantity;

    // Save the updated product to the database
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
