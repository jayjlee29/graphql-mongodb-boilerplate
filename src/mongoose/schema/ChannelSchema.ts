'use strict'
import mongoose from 'mongoose';
import {IChannel} from '../../models'
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    userId: { type: String, ref: 'User', index: true },
    status: { type: String, enum: ["ONAIR", "PENDING", "DELETED"]},
    createdAt: {type: Date, default: Date.now, index: true},
    updatedAt: Date,
    deletedAt: Date
})
// schema.virtual('id').get(function (this: { _id: any }) {
//     return this._id
// })
schema.set('toJSON', {
    virtuals: true
})
export default mongoose.model<IChannel & mongoose.Document >('Channel', schema, 'Channel');