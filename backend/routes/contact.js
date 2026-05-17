const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST — Save a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;