'use strict'
import {UserSchema, ChannelSchema, ChannelMessageSchema} from '../mongoose/schema'
import {User, Channel, ChannelMessage} from '../models'
import ChannelService from './ChannelService'

class ChannelServiceImpl implements ChannelService{
    
    getChannels( args: {limit : number, skip: number}): Promise<Channel[]> {
        const {limit, skip } = args
        return ChannelSchema.find({}, null, {limit, skip}).then((channels: Channel[])=>{
            return channels;
        })

    }
}

export default ChannelServiceImpl