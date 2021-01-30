'use strict'
import mongoose from 'mongoose';

interface User extends mongoose.Document {
    userId: String;
    username: String
    email: String;
    mobileNumber: String;
    password: String;
    created: Date;
    updated: Date;
    deleted: Date;
}

const schema = new mongoose.Schema({
    userId: String,
    username: String,
    email: String,
    mobileNumber: String,
    password: String,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<User>('User', schema);