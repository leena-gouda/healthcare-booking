const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  image: { type: String },
  about: { type: String },
  education: { type: String },
  languages: [String],
  fee: { type: Number },
  availability: { type: Map, of: [String] },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);