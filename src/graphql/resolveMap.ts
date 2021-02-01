'use strict'
import { IResolvers } from 'graphql-tools';
import {UserSchema, ChannelSchema, ChannelMessageSchema} from '../mongoose/schema'
import ChannelServiceImpl from '../service/ChannelServiceImpl'
import {Channel, ChannelMessage} from '../models'
import mongoose from 'mongoose';
const channelService = new ChannelServiceImpl();

const resolverMap: IResolvers = {
  Query: {
    getChannels(root: any, args: {limit: number, skip: number}, context: any, info: any) {
      const {pubsub} = context
      const { limit, skip } = args     
      return channelService.getChannels({limit, skip: 0});
    },
    getChannelMessages(root: any, args: any, context: any, info: any) {
      const { pubsub } = context
      const { channelId, limit } = args
      const skip = 0;
      return ChannelMessageSchema.find({channelId}, null, {limit, skip})
    },
  },
  Mutation: {
    createChannel(root: any, args: any, context: any, info: any) {
      return {

      }
    },
    addMemberChannel(root: any, args: any, context: any, info: any) {
      return {
        
      }
    },
    publishChannelMessage(root: any, args: {channelId: string, payload: string}, context: any, info: any) {
      const {pubsub, claims} = context;
      console.log('id', JSON.stringify(claims))
      const {channelId, payload} = args
      //channelId 유효성 검사
      return ChannelSchema.findById(new mongoose.Types.ObjectId(channelId)).then((channel: any)=>{
        if(!channel || !channel.id){
          throw new Error('invalid channel')
        }
        const channelMessage = new ChannelMessageSchema({channelId, payload})
        channelMessage.userId = claims.id
        channelMessage.created = new Date();
        
        return channelMessage.save().then((savedCm: ChannelMessage)=>{
            pubsub.publish(channelId, savedCm)
            return savedCm
        })
      })    
    },
  },
  Subscription: {
    channel: {
      resolve: (channelMessage: ChannelMessage) => {
        // make subscription message(currnet type channelMessage)
        console.log('subscription published', JSON.stringify(channelMessage))
        return channelMessage
      },
      subscribe: (root: any, args: any, context: any, info: Object) => {
        const { pubsub } = context;
        const { channelId } = args
        if(pubsub){
          return pubsub.asyncIterator(channelId)
        } else {
          throw new Error('pubsub is null')
        }
      }
    }
  }
  
};
export default resolverMap;