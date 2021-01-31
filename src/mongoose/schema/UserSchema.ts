'use strict'
import mongoose from 'mongoose';
import { User } from '../../models'

interface IUserSchema extends User, mongoose.Document {}
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

export default mongoose.model<IUserSchema>('User', schema);