const TeamMember = require("../models/TeamMember");

const validateTeamMember = async (req, res, next) => {
  const { image, name, position } = req.body;

  // Check if required fields are provided
  if (!image || !name || !position) {
    return res.status(400).json({ error: "Image, Name, and Position are required" });
  }

  // If all validations pass, move on to the next middleware or controller
  next();
};

module.exports = {
  validateTeamMember,
};
