'use strict'
import {UserSchema, ChannelSchema, ChannelMessageSchema, ChannelMemberSchema} from '../mongoose/schema'
import {IUser, IChannel, IChannelMessage, IAuthInfo, IChannelMember} from '../models'
import UserService from './UserService'
import { Mongoose } from 'mongoose'

class UserServiceImpl implements UserService{
    
	saveUser(user: IUser): Promise<IUser> {
		const userSchema = new UserSchema(user);
		return userSchema.save();
	}
    getUser(): Promise<IUser> {

		return Promise.resolve(null as any)

	}
    getUsers(): Promise<IUser[]> {
		return Promise.resolve(null as any)
	}
}

export default new UserServiceImpl()