const SubtotalOrder = require("../models/SubtotalOrder");
const User = require("../models/user");

const validateSubtotalOrder = async (req, res, next) => {
  const { userID, totalAmount } = req.body;

  // Check if required fields are provided
  if (!userID || !totalAmount) {
    return res.status(400).json({ error: "UserID and TotalAmount are required" });
  }

  try {
    // Check if the user exists
    const existingUser = await User.findById(userID);
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
  validateSubtotalOrder,
};
