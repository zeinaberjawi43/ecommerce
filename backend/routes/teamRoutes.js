const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');
const { validateTeamMember } = require('../middlewares/teamMemberMiddleware');

// Route to create a new team member
router.post('/add-team-member', validateTeamMember, teamMemberController.createTeamMember);

// Route to get all team members
router.get('/get-team-members', teamMemberController.getAllTeamMembers);

// Route to get a single team member by ID
router.get('/get-team-member/:id', teamMemberController.getTeamMemberById);

// Route to update a team member by ID
router.put('/update-team-member/:id', validateTeamMember, teamMemberController.updateTeamMemberById);

// Route to delete a team member by ID
router.delete('/delete-team-member/:id', teamMemberController.deleteTeamMemberById);

module.exports = router;
