'use strict'
import {IUser, IChannel, IChannelMessage} from '../models'

interface ChannelService {
    getChannels( args: {limit : number, skip: number}): Promise<IChannel[]>
}

export default ChannelService