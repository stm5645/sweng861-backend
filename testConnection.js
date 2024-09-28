const mongoose = require('mongoose');

// Replace with your actual MONGODB_URI
const MONGODB_URI = 'mongodb+srv://stm5645:stronger544@cluster0.7jj9e.mongodb.net/backend_app?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    mongoose.connection.close(); // Close the connection after testing
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });