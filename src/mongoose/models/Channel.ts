'use strict'
import mongoose from 'mongoose';

interface Channel extends mongoose.Document {
    title: String,
    description: String,
    memberIds: [String],
    userId: String,
    created: Date;
    updated: Date;
    deleted: Date;
}

const schema = new mongoose.Schema({
    title: String,
    description: String,
    memberIds: [String],
    userId: String,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
})

schema.virtual('channelId').get(function (this: { _id: any }) {
    return this._id
})

export default mongoose.model<Channel>('Channel', schema);