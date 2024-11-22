const express = require('express');
const jwt = require('jsonwebtoken');
const Pill = require('../models/Pill');
const router = express.Router();

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Unauthorized' });

  jwt.verify(token, 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Get pills
router.get('/', authenticate, async (req, res) => {
  const pills = await Pill.find({ userId: req.user.id });
  res.json(pills);
});

// Add a new pill
router.post('/', authenticate, async (req, res) => {
  const { name, dosage, timeTaken } = req.body;

  const newPill = new Pill({ userId: req.user.id, name, dosage, timeTaken });
  await newPill.save();
  res.status(201).json(newPill);
});

// Delete a pill
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  await Pill.findByIdAndDelete(id);
  res.json({ message: 'Pill deleted' });
});

module.exports = router;
