const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission'); // Correct model import

// Fetch all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find(); // Fetch all submissions
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new submission
router.post('/create', async (req, res) => {
  console.log('Received request at /create:', req.body); // Log the request body to verify data
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    console.log('New submission saved:', newSubmission); // Log the saved submission
    res.status(201).json(newSubmission); // Send the created submission back in response
  } catch (error) {
    console.error('Error creating submission:', error); // Log any errors that occur
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
