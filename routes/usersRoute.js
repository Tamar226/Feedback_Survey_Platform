const express = require('express');
const usersRouter = express.Router();

const userControllers = require('../controllers/usersController');

router.use(express.json());

router.get('/', userControllers.getAllUsers);
router.get('/:userId', userControllers.getUserById);
// router.get('/:userId/:typeInformetion', userControllers.getUserInformation);
router.put('/:userId', userControllers.updateUser);
router.delete('/:userId', userControllers.deleteUser);
router.post('/', userControllers.addUser);
router.post('/register', userControllers.registerUser);
router.post('/login', userControllers.loginUser);

module.exports = usersRouter;