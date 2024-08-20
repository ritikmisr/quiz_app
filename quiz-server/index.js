const express = require('express');
require('./db/connectToDb');
const userRouter = require('./routes/userRoute');
const questionRouter = require('./routes/questionRoute');
const { dbConnect } = require('./db/connectToDb');

dbConnect();

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(questionRouter);

// userRouter.post('/signup', userController.signup);

// userRouter.post('/testCompleted', auth, userController.testCompleted);


const port_number = 5000;
app.listen(port_number, () => console.log(`connected at port ${port_number}`))