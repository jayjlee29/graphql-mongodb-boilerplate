'use strict'
import mongoose from 'mongoose';
import {Channel} from '../../models'


interface IChannelSchema extends Channel, mongoose.Document {}
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

export default mongoose.model<IChannelSchema>('Channel', schema);