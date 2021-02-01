'use strict'
import mongoose from 'mongoose';
import { User } from '../../models'

const schema = new mongoose.Schema({
    username: String,
    email: String,
    mobileNumber: String,
    password: String,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<User & mongoose.Document>('User', schema, 'User');