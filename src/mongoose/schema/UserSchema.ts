'use strict'
import mongoose from 'mongoose';
import { IUser } from '../../models'

const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    userId: {type: String, unique: true},
    username: String,
    displayName: String,
    email: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
    deletedAt: Date
});

export default mongoose.model<IUser & mongoose.Document>('User', schema, 'User');