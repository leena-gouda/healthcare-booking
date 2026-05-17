const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'This email is already subscribed' });
    }
    const subscription = new Newsletter({ email });
    await subscription.save();
    res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;