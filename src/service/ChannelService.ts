'use strict'
import {User, Channel, ChannelMessage} from '../models'

interface ChannelService {
    getChannels( args: {limit : number, skip: number}): Promise<Channel[]>
}

export default ChannelService