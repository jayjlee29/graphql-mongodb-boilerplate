'use strict'
import {UserSchema, ChannelSchema, ChannelMessageSchema, ChannelMemberSchema} from '../mongoose/schema'
import {IUser, IChannel, IChannelMessage, IAuthInfo, IChannelMember} from '../models'
import UserService from './UserService'
import { Mongoose } from 'mongoose'

class UserServiceImpl implements UserService{
    private static _instance: UserService = new UserServiceImpl();

	private constructor() {
		UserServiceImpl._instance = this;
	}

	static getInstance() : UserService{
		if (!UserServiceImpl._instance) {
			UserServiceImpl._instance = new UserServiceImpl();
		}
		return this._instance;
	}

	saveUser(user: IUser): Promise<IUser> {
		const userSchema = new UserSchema(Object.assign({_id: user.id}, user));
		
		return userSchema.save();
	}

    getUser(id: String): Promise<IUser> {

		return UserSchema.findById(id).then((user)=>{
			if(!user){
				return null as any
			}
			const r : IUser = Object.assign({
				id: user.id
			}, user.toJSON())
			return r
		})

	}
    getUsers(ids: String[]): Promise<IUser[]> {
		return UserSchema.find({_id: ids}).then((users)=>{
			const results = users.map((user)=>{
				return Object.assign({
					id: user.id
				}, user.toJSON())
			})
			return Promise.resolve(results)
		})
		
	}
}


export default UserServiceImpl.getInstance()