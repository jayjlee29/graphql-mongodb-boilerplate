'use strict'
import mongoose from 'mongoose';
import {Channel} from '../../models'

const schema = new mongoose.Schema({
    title: {type: String},
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
export default mongoose.model<Channel & mongoose.Document >('Channel', schema, 'Channel');