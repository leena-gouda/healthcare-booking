const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.get('/', async (req, res) => {
  try {
    const { specialty, available, sort } = req.query;
    let query = {};
    if (specialty && specialty !== 'All') query.specialty = specialty;
    if (available === 'true') query.available = true;
    let sortOption = {};
    if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'experience') sortOption = { experience: -1 };
    else if (sort === 'fee') sortOption = { fee: 1 };
    else if (sort === 'name') sortOption = { name: 1 };
    const doctors = await Doctor.find(query).sort(sortOption);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const saved = await doctor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;