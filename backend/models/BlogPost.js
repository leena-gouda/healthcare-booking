const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  excerpt: { type: String },
  content: { type: String },
  readTime: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);