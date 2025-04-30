const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/middleware');
const alertController = require('../controllers/alert');

router.use(authMiddleware.authenticateToken);

router.post('/' ,alertController.createAlert);
router.get('/' , alertController.getAlerts);

router.patch('/:id/activate', alertController.activateAlert);
router.patch('/:id/deactivate', alertController.deactivateAlert);

router.delete('/:id', alertController.deleteAlert);



module.exports = router;
