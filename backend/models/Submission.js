const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  phone: String,
  address: String,
  course: String,
  semester: String,
  comments: String
});

module.exports = mongoose.model('Submission', SubmissionSchema);
