'use strict'
import {IUser, IChannel, IChannelMessage, IChannelMember, IAuthInfo} from '../models'

interface ChannelService {
    createChannel(args: {title: string, description: string}, authInfo: IAuthInfo): Promise<IChannel>
    getChannels( args: {limit : number, skip: number}): Promise<IChannel[]>
    
}

export default ChannelService