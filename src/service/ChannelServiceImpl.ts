'use strict'
import {UserSchema, ChannelSchema, ChannelMessageSchema} from '../mongoose/schema'
import {IUser, IChannel, IChannelMessage} from '../models'
import ChannelService from './ChannelService'

class ChannelServiceImpl implements ChannelService{
    
    getChannels( args: {limit : number, skip: number}): Promise<IChannel[]> {
        const {limit, skip } = args
        return ChannelSchema.find({}, null, {limit, skip}).then((channels: IChannel[])=>{
            return channels;
        })

    }
}

export default ChannelServiceImpl