'use strict'
import {IUser, IChannel, IChannelMessage, IChannelMember, IAuthInfo} from '../models'

interface UserService {
    saveUser(user: IUser): Promise<IUser>
    getUser(id: String): Promise<IUser>
    getUsers(ids: String[]): Promise<IUser[]>
    
}

export default UserService