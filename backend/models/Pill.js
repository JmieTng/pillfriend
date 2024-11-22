const mongoose = require('mongoose');

const pillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  timeTaken: { type: Date, required: true },
});

module.exports = mongoose.model('Pill', pillSchema);
