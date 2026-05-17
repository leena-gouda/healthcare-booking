const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const doctorRoutes = require('./routes/doctors');
const reviewRoutes = require('./routes/reviews');
const blogRoutes = require('./routes/blog');

app.use('/api/doctors', doctorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Healthcare API is running!' });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });