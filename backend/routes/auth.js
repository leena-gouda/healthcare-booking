const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

// Patient Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dateOfBirth, gender } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const patient = new Patient({ name, email, password, dateOfBirth, gender, role: 'patient' });
    await patient.save();

    const token = jwt.sign(
      { id: patient._id, name: patient.name, email: patient.email, role: patient.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        role: patient.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Staff/Admin Register
router.post('/register-admin', async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Verify the secret code
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: 'Invalid staff authorization code' });
    }

    const existingUser = await Patient.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const admin = new Patient({ name, email, password, role: 'admin' });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      patient: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login (works for both patients and admins)
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
      { id: patient._id, name: patient.name, email: patient.email, role: patient.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        role: patient.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    if (!patient) return res.status(404).json({ message: 'User not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.role;
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