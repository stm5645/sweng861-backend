const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const submissionsRoutes = require('./routes/Submissions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionsRoutes); // Correct route import

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
