const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // חובה שיהיה משתמש מקושר לכל Alert
  },
  locationName: { type: String }, 
  coordinates: {
    lat: { type: Number },
    lon: { type: Number },
  },
  parameter: { type: String, required: true },
  threshold: { type: Number, required: true },
  description: { type: String },
  lastTriggeredAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);