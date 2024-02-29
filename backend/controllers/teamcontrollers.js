const Employee = require("../models/team");

// Controller function to create a new employee
const createEmployee = async (req, res) => {
  try {
    const { name, image, position } = req.body;

    const newEmployee = new Employee({
      name,
      image,
      position,
    });

    await newEmployee.save();
    res.json({ message: "Cretaed successfully" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to update an existing employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, position } = req.body;

    // Check if the employee with the provided id exists
    const existingEmployee = await Employee.findById(id);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, image, position },
      { new: true }
    );

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to get a specific employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).send("Internal Server Error");
  }
};
// Controller function to get an employee by name
const getEmployeeByName = async (req, res) => {
  try {
    const { name } = req.params;

    const employee = await Employee.findOne({ name });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee by name:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to delete an employee by name
const deleteEmployeeByName = async (req, res) => {
  try {
    const { name } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ name });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee by name:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeeByName,
  deleteEmployeeByName,
};
