'use strict'
import {UserSchema, ChannelSchema, ChannelMessageSchema, ChannelMemberSchema} from '../mongoose/schema'
import {IUser, IChannel, IChannelMessage, IAuthInfo, IChannelMember} from '../models'
import ChannelService from './ChannelService'
import { Mongoose } from 'mongoose'

class ChannelServiceImpl implements ChannelService{
	private static _instance: ChannelService = new ChannelServiceImpl();

	private constructor() {
		ChannelServiceImpl._instance = this;
	}

	static getInstance() : ChannelService{
		if (!ChannelServiceImpl._instance) {
			ChannelServiceImpl._instance = new ChannelServiceImpl();
		}
		return this._instance;
	}

    getChannels( args: {limit : number, skip: number}): Promise<IChannel[]> {
        const {limit, skip } = args
        return ChannelSchema.find({}, null, {limit, skip}).then((channels: IChannel[])=>{
            return channels;
        })

    }

	getChannelMembers( args: {channelId: string, limit : number, skip: number}): Promise<IChannelMember[]> {
        const {limit, skip, channelId } = args

		if(!channelId){
			throw new Error('invalid channel id ' + channelId)
		}

        return ChannelMemberSchema.find({_id: channelId}, null, {limit, skip}).then((channelMembers: IChannelMember[])=>{
            return channelMembers;
        })

    }

    createChannel(args: {title: string, description: string}, authInfo: IAuthInfo): Promise<IChannel> {
        const {title, description} = args;
        const channel = new ChannelSchema();
        channel.title = title
        channel.description = description
        channel.createdAt = new Date();
        channel.status = "ONAIR"
        channel.userId = authInfo.id

		return channel.save().then((channel: IChannel)=>{
			if(!channel){
				throw new Error('Error createChannel')
			}

			const channelMember = new ChannelMemberSchema()
			channelMember.channelId = channel.id;
			channelMember.userId = authInfo.id;
			channelMember.memberId = authInfo.id;
			channelMember.status = "ACTIVE"

			return channelMember.save().then((savedItem: IChannelMember)=>{
				if(!savedItem){
					console.warn("error join me")
				}
				return channel;
			})
		})
    }

	joinChannel(channelId: string, authInfo: IAuthInfo): Promise<IChannelMember>{

		const channelMember = new ChannelMemberSchema()
		channelMember.channelId = channelId;
		channelMember.userId = authInfo.id;
		channelMember.memberId = authInfo.id;
		channelMember.status = "ACTIVE"
		return channelMember.save();
	}

	inviteChannel(channelId: string, authInfo: IAuthInfo, memberIds: string[]): Promise<IChannelMember[]> {

		return new Promise((resolve, reject)=>{

			const schemas = memberIds.map((memberId)=>{
				const channelMember = new ChannelMemberSchema()
				channelMember.channelId = channelId;
				channelMember.userId = authInfo.id;
				channelMember.memberId = memberId;
				channelMember.status = "PENDING"
				return channelMember
			})	

			ChannelMemberSchema.insertMany(schemas, (err: Error, docs: IChannelMember[])=>{
				if(err){
					return reject(err)
				}

				return resolve(docs)
			})
		})
	}
}

export default ChannelServiceImpl.getInstance()