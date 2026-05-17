const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// Get all appointments for the logged-in patient
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.patient.id })
      .populate('doctor', 'name specialty image fee')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a new appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;
    const appointment = new Appointment({
      patient: req.patient.id,
      doctor,
      date,
      time,
      reason,
    });
    const saved = await appointment.save();
    const populated = await saved.populate('doctor', 'name specialty image fee');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cancel an appointment
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      patient: req.patient.id,
    });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    appointment.status = 'cancelled';
    await appointment.save();
    const populated = await appointment.populate('doctor', 'name specialty image fee');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;