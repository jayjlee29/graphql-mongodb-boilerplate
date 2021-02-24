'use strict'
import mongoose from 'mongoose';
import { IUser } from '../../models'

const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    _id: String,
    username: String,
    displayName: String,
    email: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: Date,
    deletedAt: Date
}, {_id: false});
schema.virtual('id').get(function (this: { _id: any }) {
    return this._id
})
export default mongoose.model<IUser & mongoose.Document>('User', schema, 'User');