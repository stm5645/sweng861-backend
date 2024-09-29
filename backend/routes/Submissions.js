const express = require('express');
const Submission = require('../models/Submission');
const router = express.Router();

// Fetch all submissions for the logged-in user
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new submission
router.post('/create', async (req, res) => {
  const newSubmission = new Submission({
    ...req.body,
    userId: req.user.id
  });

  try {
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating submission', error: error.message });
  }
});

module.exports = router;
