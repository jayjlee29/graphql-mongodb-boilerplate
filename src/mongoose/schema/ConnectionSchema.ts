'use strict'
import mongoose from 'mongoose';
import { IConnection } from '../../models'
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true},
    userId: String,
    createdAt: {type: Date, required: true, default: Date.now, index: true},
    updatedAt: Date,
    deletedAt: Date
}, {_id: false});

schema.index({createdAt: 1})
export default mongoose.model<IConnection & mongoose.Document>('Connection', schema, 'Connection');