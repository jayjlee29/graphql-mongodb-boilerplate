'use strict'
import mongoose from 'mongoose';
import { ISentChannelMessage } from '../../models'

//interface IChannelMessageSchema extends ChannelMessage, mongoose.Document {}
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    channelId: {type: 'ObjectId', ref: "Channel"},
    messageId: {type: 'ObjectId', ref: "ChannelMessage"},
    fromUserId: {type: 'String', ref: "User"},
    userId: {type: 'String', ref: "User"},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model<ISentChannelMessage & mongoose.Document>('SentChannelMessage', schema, 'SentChannelMessage');