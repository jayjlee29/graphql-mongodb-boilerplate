'use strict'
import {IUser, IChannel, IChannelMessage, IChannelMember, IAuthInfo} from '../models'

interface UserService {
    saveUser(user: IUser): Promise<IUser>
    getUser(): Promise<IUser>
    getUsers(): Promise<IUser[]>
    
}

export default UserService