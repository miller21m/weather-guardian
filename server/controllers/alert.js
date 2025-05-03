const Alert = require('../models/alert');

// Create a new alert for the authenticated user
exports.createAlert = async (req, res) => {
  try {
    const { locationName, coordinates, parameter, threshold, description } = req.body;

    // Require at least a locationName or valid coordinates
    if (!locationName && (!coordinates || !coordinates.lat || !coordinates.lon)) {
        return res.status(400).json({ error: 'Either locationName or coordinates must be provided' });
    }


    const alert = new Alert({
        user: req.user.id,
        locationName,
        coordinates,
        parameter,
        threshold,
        description,
      });

    await alert.save();

    res.status(201).json(alert);
  } catch (err) {
    console.error('Error creating alert:', err.message);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

// Get all alerts created by the authenticated user
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json(alerts);
  } catch (err) {
    console.error('Error fetching alerts:', err.message);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

// Delete an alert by ID (only if owned by the requesting user)
exports.deleteAlert = async (req, res) => {
    try {
      const alert = await Alert.findById(req.params.id);
  
      if (!alert) {
        return res.status(404).json({ error: 'Alert not found' });
      }
  
      // Ensure the user owns this alert
      if (alert.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to delete this alert' });
      }
  
      await alert.deleteOne();// Remove alert from DB
      res.json({ message: 'Alert deleted successfully' });

    } catch (err) {
      console.error('Error deleting alert:', err.message);
      res.status(500).json({ error: 'Failed to delete alert' });
    }
  };

  // Activate an existing alert (sets `active` to true)
  exports.activateAlert = async (req, res) => {
    try {
      const alert = await Alert.findById(req.params.id);
  
      if (!alert) {
        return res.status(404).json({ error: 'Alert not found' });
      }
  
      if (alert.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to modify this alert' });
      }
  
      alert.active = true;
      await alert.save();
  
      res.json({ message: 'Alert activated successfully', alert });
    } catch (err) {
      console.error('Error activating alert:', err.message);
      res.status(500).json({ error: 'Failed to activate alert' });
    }
  };
  
  // Deactivate an existing alert (sets `active` to false)
  exports.deactivateAlert = async (req, res) => {
    try {
      const alert = await Alert.findById(req.params.id);
  
      if (!alert) {
        return res.status(404).json({ error: 'Alert not found' });
      }
  
      if (alert.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to modify this alert' });
      }
  
      alert.active = false;
      await alert.save();
  
      res.json({ message: 'Alert deactivated successfully', alert });
    } catch (err) {
      console.error('Error deactivating alert:', err.message);
      res.status(500).json({ error: 'Failed to deactivate alert' });
    }
  };
  
  
