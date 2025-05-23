const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    // This will now be the user-entered description
    type: String,
    required: true,
  },
  // REMOVED: initialDescription field
  imageUrl: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  liveLink: {
    type: String,
  },
  repoLink: {
    type: String,
  },
  category: {
    type: String,
    default: "web",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
