const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather');
const authMiddleware = require('../middleware/middleware');

// Protect all weather routes with token authentication
router.use(authMiddleware.authenticateToken);

// Fetch weather data based on user input (e.g., location)
router.get('/' , weatherController.getWeather);

module.exports = router;