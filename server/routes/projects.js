const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/projects
// @desc    Add a new project
// @access  Private (would need auth middleware in a real app)
router.post("/", async (req, res) => {
  // REMOVED: initialDescription from destructuring
  const {
    title,
    description,
    imageUrl,
    technologies,
    liveLink,
    repoLink,
    category,
  } = req.body;
  try {
    const newProject = new Project({
      title,
      description, // User-entered description
      imageUrl,
      technologies,
      liveLink,
      repoLink,
      category,
    });
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
