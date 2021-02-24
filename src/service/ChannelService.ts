'use strict'
import {IUser, IChannel, IChannelMessage, IChannelMember, IAuthInfo} from '../models'

interface ChannelService {
    createChannel(args: {title: string, description: string}, authInfo: IAuthInfo): Promise<IChannel>
    getChannels( args: {limit : number, skip: number}): Promise<IChannel[]>
    joinChannel(channelId: string, authInfo: IAuthInfo): Promise<IChannelMember>
    inviteChannel(channelId: string, authInfo: IAuthInfo, memberIds: string[]): Promise<IChannelMember[]>
    getChannelMembers( args: {channelId: string, limit : number, skip: number}): Promise<IChannelMember[]>
}

export default ChannelService