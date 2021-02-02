'use strict'
import mongoose from 'mongoose';
import { IUser } from '../../models'

const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    mobileNumber: String,
    password: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
    deletedAt: Date
});

export default mongoose.model<IUser & mongoose.Document>('User', schema, 'User');