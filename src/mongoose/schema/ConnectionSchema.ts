'use strict'
import mongoose from 'mongoose';
import { Connection } from '../../models'

const schema = new mongoose.Schema({
    isConnected: Boolean,
    clientId: String,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<Connection & mongoose.Document>('Connection', schema, 'Connection');