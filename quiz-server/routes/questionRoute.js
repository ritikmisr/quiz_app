const express = require('express');
const questionController = require('../controllers/questionController');
const { auth } = require('../middleware/auth');

const questionRoute = new express.Router();

// Just for adding new questions into db
questionRoute.post('/addQuestion', auth, questionController.addQuestions);

questionRoute.get('/getQuestions', auth, questionController.fetchQuestions);

module.exports = questionRoute;