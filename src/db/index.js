import mongoose from "mongoose";
import {DB_NAME } from '../constants.js'
import { config } from "dotenv";
config(); 
// 
console.log("process.env.MONGODB_URI:   ", process.env.MONGODB_URI)

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB connection. Host: ", connectionInstance.connection.host);
    }catch(err){
        console.log("MongoDB Connnection Error: ", err); 
        process.exit(1);
    }

}

export default connectDB;