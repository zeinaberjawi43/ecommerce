const Review = require("../models/reviews");
const User = require("../models/user");

const validateReview = async (req, res, next) => {
  const { user } = req.body;

  // Check if required fields are provided
  if (!user) {
    return res.status(400).json({ error: "User is required" });
  }

  try {
    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // If all validations pass, move on to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  validateReview,
};
