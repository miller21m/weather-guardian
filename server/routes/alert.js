const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/middleware');
const alertController = require('../controllers/alert');

// Apply auth middleware to all alert routes to ensure only authenticated users can access them
router.use(authMiddleware.authenticateToken);

// Create a new alert
router.post('/' ,alertController.createAlert);

// Get all alerts for the authenticated user
router.get('/' , alertController.getAlerts);

// Toggle alert status via separate endpoints for better clarity and control
router.patch('/:id/activate', alertController.activateAlert);
router.patch('/:id/deactivate', alertController.deactivateAlert);

// Permanently delete an alert from the database
router.delete('/:id', alertController.deleteAlert);



module.exports = router;
