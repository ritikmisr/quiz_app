const mongoose = require('mongoose');

//In mongoose we are providing database name alsng with connection URL
const connectionURL = 'mongodb+srv://quiz:quiz321@cluster0.qtnx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const dbConnect = async () => {

    try {
        
        const connect = await mongoose.connect(connectionURL);

        if (connect) {

            console.log('connection to mongoDB successful...');
            
        }

    } catch (error) {
        
        console.log(error);
        
    }

}


module.exports = { dbConnect };