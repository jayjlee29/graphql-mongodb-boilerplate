'use strict'
import mongoose from 'mongoose';
import {IChannelMember} from '../../models'
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    channelId: { type: String, ref: 'Channel',  index: true},
    userId: { type: String, ref: 'User', index: true },
    memberId: { type: String, ref: 'User', index: true },
    status: { type: String, enum: ["ACTIVE", "PENDING", "LEAVE", "WAITING", "DELETED"]},
    createdAt: {type: Date, default: Date.now, index: true},
    updatedAt: Date
})
// schema.virtual('id').get(function (this: { _id: any }) {
//     return this._id
// })
schema.set('toJSON', {
    virtuals: true
})
export default mongoose.model<IChannelMember & mongoose.Document >('ChannelMember', schema, 'ChannelMember');