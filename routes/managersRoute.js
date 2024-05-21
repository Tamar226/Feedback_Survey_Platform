
const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managersController');

router.get('/', managerController.getAllManagers);
router.get('/:id', managerController.getManagerById);
router.post('/', managerController.addManager);
// router.post('/login', managerController.loginManager);
router.post('/register', managerController.addManager);
router.put('/:managerId', managerController.updateManager);
router.delete('/:managerId', managerController.deleteManager);

module.exports = router;

