const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid!');
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('Invalid password!');
        }
    },
    totalMarks: {
        type: Number,
        default: 0
    },
    testGiven: { 
        type: Boolean, 
        default: false 
    },
    isEvaluated: {
        type: Boolean, 
        default: false
    },
    questions: [{
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, 
        submittedAnswer: { type: String }, 
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login!');
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login!');
    }
    return user;
}

userSchema.methods.toSafeObject = function () {
    const user = this.toObject();
    delete user.password;
    return user;
  };

userSchema.methods.getGeneratedToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'quiz-application');
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    //next will tell that our operation will be finished otherwise it will be hanged
    next();
});

const User = mongoose.model('Users', userSchema);

module.exports = User;