const Question = require('../models/questionModel');

// For adding new question to db
const addQuestions = async (req, res) => {
   const getQuestions = new Question(req.body);
    try {
        getQuestions.save();
        res.send(getQuestions);
    }
    catch (e) {
        res.status(400).send('Unable to fetch questions!');
    }
}


const fetchQuestions = async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 5 } },
        {
            $project: {
                question: 1, 
                options: 1, 
            }
        }]);

        if (!questions) {
            res.send('No question found');
        }
        res.send(questions);
    }
    catch (e) {
        res.status(400).send({error: 'Unable to fetch questions!'});
    }
}

module.exports = {
    addQuestions,
    fetchQuestions
}