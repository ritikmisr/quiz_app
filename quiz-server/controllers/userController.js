const User = require('../models/userModel');

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.getGeneratedToken();
        const safeUser = user.toSafeObject();
        res.send({ safeUser, token });
    }
    catch (e) {
        res.status(400).send({ error: 'User not found!' });
    }
}

const signup = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.getGeneratedToken();
        const safeUser = user.toSafeObject();
        res.status(200).send({ safeUser, token });
    }
    catch (e) {
        res.status(400).send({ error: 'Unable to create user!' });
    }
}

const testCompleted = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { $set: { testGiven: true } },
            { new: true }
        );

        if(!user) {
            res.send({error: 'No User found'});
        }
        res.status(200).send();
    }
    catch(e) {
        res.status(400).send({error: 'Something went wrong'});
    }
}

module.exports = { login, signup, testCompleted };