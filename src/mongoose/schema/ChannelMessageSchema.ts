'use strict'
import mongoose from 'mongoose';
import { IChannelMessage } from '../../models'

//interface IChannelMessageSchema extends ChannelMessage, mongoose.Document {}

const schema = new mongoose.Schema({
    channelId: String,
    payload: String,
    targetIds: [String],
    targetSent: [Boolean],
    userId:String,
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
});

export default mongoose.model<IChannelMessage & mongoose.Document>('ChannelMessage', schema, 'ChannelMessage');