const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const BlogPost = require('../models/BlogPost');
const Review = require('../models/Review');

// Middleware to check if user is admin
function adminOnly(req, res, next) {
  if (req.patient.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
}

// ── STATS ──
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments({ role: 'patient' });
    const totalAppointments = await Appointment.countDocuments();
    const upcomingAppointments = await Appointment.countDocuments({ status: 'upcoming' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });
    const totalBlogPosts = await BlogPost.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      upcomingAppointments,
      completedAppointments,
      cancelledAppointments,
      totalBlogPosts,
      totalReviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATIENTS ──
router.get('/patients', auth, adminOnly, async (req, res) => {
  try {
    const patients = await Patient.find({ role: 'patient' }).select('-password').sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/patients/:id', auth, adminOnly, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    await Appointment.deleteMany({ patient: req.params.id });
    res.json({ message: 'Patient and their appointments deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DOCTORS ──
router.post('/doctors', auth, adminOnly, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const saved = await doctor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/doctors/:id', auth, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/doctors/:id', auth, adminOnly, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── APPOINTMENTS ──
router.get('/appointments', auth, adminOnly, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name specialty image')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/appointments/:id/status', auth, adminOnly, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('patient', 'name email').populate('doctor', 'name specialty image');
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── BLOG POSTS ──
router.post('/blog', auth, adminOnly, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/blog/:id', auth, adminOnly, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── REVIEWS ──
router.get('/reviews', auth, adminOnly, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('doctorId', 'name specialty')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/reviews/:id', auth, adminOnly, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;