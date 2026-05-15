const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Doctor = require('../models/Doctor');

router.get('/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    const saved = await review.save();

    const reviews = await Review.find({ doctorId: req.body.doctorId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Doctor.findByIdAndUpdate(req.body.doctorId, {
      rating: Math.round(avgRating * 10) / 10,
      reviews: reviews.length,
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;