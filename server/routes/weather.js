const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather');
const authMiddleware = require('../middleware/middleware');

router.use(authMiddleware.authenticateToken);

router.get('/' , weatherController.getWeather);

module.exports = router;