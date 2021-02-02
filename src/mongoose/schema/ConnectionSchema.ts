'use strict'
import mongoose from 'mongoose';
import { IConnection } from '../../models'
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    isConnected: Boolean,
    clientId: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
    deletedAt: Date
});

export default mongoose.model<IConnection & mongoose.Document>('Connection', schema, 'Connection');