'use strict'
import mongoose from 'mongoose';
import { IChannelMessage } from '../../models'

//interface IChannelMessageSchema extends ChannelMessage, mongoose.Document {}
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    channelId: { type: Schema.Types.ObjectId, ref: 'Channel', index: true },
    payload: String,
    userId: { type: String, ref: 'User' },
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
    deletedAt: Date
});

export default mongoose.model<IChannelMessage & mongoose.Document>('ChannelMessage', schema, 'ChannelMessage');