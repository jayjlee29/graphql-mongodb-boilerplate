'use strict'
import mongoose from 'mongoose';

interface Connection extends mongoose.Document {
    id: String,
    isConnected: Boolean,
    created: Date;
    updated: Date;
    deleted: Date;
}

const schema = new mongoose.Schema({
    id: String,
    isConnected: Boolean,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<Connection>('Connection', schema);