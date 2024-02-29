const Program = require("../models/program");
const Category = require("../models/category");

// Function to add a new program
exports.addProgram = async (req, res) => {
  try {
    const { name, description, category, talent, price } = req.body;

    const newProgram = new Program({
      name,
      description,
      category,
      talent,
      price,
    });

    await newProgram.save();

    res.status(201).json({ message: "Program added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();

    res.status(200).json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a program by ID
exports.getProgramById = async (req, res) => {
  try {
    const programId = req.params.id;

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get a program by name
exports.getProgramByName = async (req, res) => {
  try {
    const { name } = req.params;

    const program = await Program.findOne({ name });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get programs by category
exports.getProgramsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.category;

    // Check if the category exists
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if there are programs in the category
    const programs = await Program.find({ category: categoryId });

    if (programs.length === 0) {
      return res
        .status(404)
        .json({ message: "No programs found in this category" });
    }

    res.status(200).json( programs );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update a program by ID
exports.updateProgramById = async (req, res) => {
  try {
    const programId = req.params.id;
    const { name, description, category, talent, price } = req.body;

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    program.name = name || program.name;
    program.description = description || program.description;
    program.category = category || program.category;
    program.talent = talent || program.talent;
    program.price = price || program.price;

    await program.save();

    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update a program by name
exports.updateProgramByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { description, category, talent, price } = req.body;

    const program = await Program.findOne({ name });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    program.description = description || program.description;
    program.category = category || program.category;
    program.talent = talent || program.talent;
    program.price = price || program.price;

    await program.save();

    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a program by ID
exports.deleteProgramById = async (req, res) => {
  try {
    const programId = req.params.id;

    const program = await Program.findById(programId);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await program.deleteOne();

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a program by name
exports.deleteProgramByName = async (req, res) => {
  try {
    const { name } = req.params;

    const program = await Program.findOne({ name });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    await program.deleteOne();

    res.status(200).json({ message: "Program deleted successfully" });
  } 
  catch (error) {
    console.error(error);
        res.status(500).json({ error: error.message });
  }
};
