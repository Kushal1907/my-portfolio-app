const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage");

// @route   POST api/contact
// @desc    Save a contact message
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContactMessage = new ContactMessage({
      name,
      email,
      message,
    });

    const contactMessage = await newContactMessage.save();
    res.json({ msg: "Message sent successfully!", contactMessage });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
