const mongoose = require('mongoose');

// Schema definition for a weather alert
const alertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who created the alert
    required: true,
  },
  locationName: { type: String },                             // Optional: name of the location
  coordinates: {
    lat: { type: Number },                                    // Optional: latitude
    lon: { type: Number },                                    // Optional: longitude
  },
  parameter: { type: String, required: true },                // e.g., temperature, wind, etc.
  threshold: { type: Number, required: true },
  description: { type: String },
  lastTriggeredAt: { type: Date },
  active: { type: Boolean, default: true },
}, { timestamps: true });                                     // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Alert', alertSchema);