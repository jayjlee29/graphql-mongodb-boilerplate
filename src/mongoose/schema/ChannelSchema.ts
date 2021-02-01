'use strict'
import mongoose from 'mongoose';
import {IChannel} from '../../models'

const schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    memberIds: [String],
    userId: {type: String},
    created: {type: Date, default: Date.now},
    updated: Date,
    deleted: Date
})

schema.set('toJSON', {
    virtuals: true
})
export default mongoose.model<IChannel & mongoose.Document >('Channel', schema, 'Channel');