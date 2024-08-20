const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true,
    }],
    answer: {
        type: String,
        required: true
    }
});

const Question = mongoose.model('Questions', questionSchema);

module.exports = Question;