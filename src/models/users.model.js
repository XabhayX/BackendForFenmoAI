import mongoose, { SchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        index: true, 
        lowercase: true
    }
})

export const User = mongoose.model(" User", userSchema);