'use strict'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export default () => {

    const connect = () => {
        console.log('connect mongoose', process.env.MONGO_URI)
        const URI = process.env.MONGO_URI || "localhost"; // your mongodb uri
        const DB = process.env.MONGO_DB || "mongoose"; // your db
    
        const db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', function(){
            // CONNECTED TO MONGODB SERVER
            console.log("Connected to mongod server");
        });
        console.log(URI)
        //mongoose.connect(`mongodb://${URI}/${DB}`, { useNewUrlParser: true, useUnifiedTopology: true  });
        mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

    }

    connect();
    
    mongoose.connection.on('disconnected', connect);
}