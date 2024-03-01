const Team = require('../models/team');

// Controller to create a new team member
exports.createTeamMember = async (req, res) => {
  try {
    const { image, name, position } = req.body;

    // Create a new team member
    const teamMember = new Team({
      image,
      name,
      position
    });

    // Save the team member to the database
    await teamMember.save();

    res.status(201).json({ message: 'Team member created successfully', teamMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get all team members
exports.getAllTeamMembers = async (req, res) => {
  try {
    // Retrieve all team members from the database
    const teamMembers = await Team.find();

    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to get a single team member by ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMemberId = req.params.id;

    // Retrieve the team member by ID from the database
    const teamMember = await Team.findById(teamMemberId);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.status(200).json(teamMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update a team member by ID
exports.updateTeamMemberById = async (req, res) => {
  try {
    const teamMemberId = req.params.id;
    const { image, name, position } = req.body;

    // Check if the team member exists
    const teamMember = await Team.findById(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Update the team member
    teamMember.image = image;
    teamMember.name = name;
    teamMember.position = position;

    // Save the updated team member to the database
    await teamMember.save();

    res.status(200).json({ message: 'Team member updated successfully', teamMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a team member by ID
exports.deleteTeamMemberById = async (req, res) => {
  try {
    const teamMemberId = req.params.id;

    // Delete the team member from the database
    await Team.findByIdAndDelete(teamMemberId);

    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
