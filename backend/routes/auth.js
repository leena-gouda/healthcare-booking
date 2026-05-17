const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const patient = new Patient({ name, email, password });
    await patient.save();

    // Create token
    const token = jwt.sign(
      { id: patient._id, name: patient.name, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await patient.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: patient._id, name: patient.name, email: patient.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current patient profile
router.get('/me', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update patient profile
router.put('/me', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password change through this route
    const patient = await Patient.findByIdAndUpdate(
      req.patient.id,
      updates,
      { new: true }
    ).select('-password');
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;