const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  phone: String,
  address: String,
  course: String,
  semester: String,
  comments: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
