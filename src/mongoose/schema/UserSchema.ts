'use strict'
import mongoose from 'mongoose';
import { IUser } from '../../models'

const schema = new mongoose.Schema({
    username: String,
    email: String,
    mobileNumber: String,
    password: String,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<IUser & mongoose.Document>('User', schema, 'User');