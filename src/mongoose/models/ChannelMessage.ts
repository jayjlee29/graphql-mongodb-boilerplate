'use strict'
import mongoose from 'mongoose';

interface ChannelMessage extends mongoose.Document {
    channelId: String,
    payload: String,
    targetIds: [String],
    targetSent: [Boolean],
    created: Date;
    updated: Date;
    deleted: Date;
}

const schema = new mongoose.Schema({
    channelId: String,
    payload: String,
    targetIds: [String],
    targetSent: [Boolean],
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<ChannelMessage>('ChannelMessage', schema);