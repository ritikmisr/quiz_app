const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const userRouter = express.Router();

userRouter.post('/login', userController.login);

userRouter.post('/signup', userController.signup);

userRouter.post('/testCompleted', auth, userController.testCompleted);

module.exports = userRouter;