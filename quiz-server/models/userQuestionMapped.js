const mongoose = require('mongoose');

const userQuestionMappedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },

    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Questions'
    },

    answerSubmitted: { type: String, required: true },

    testSubmitted: { type: Boolean, default: false },
    
});

const mappedAnswers = mongoose.model('userQuestionMappedSchema',userQuestionMappedSchema);
module.exports = mappedAnswers;