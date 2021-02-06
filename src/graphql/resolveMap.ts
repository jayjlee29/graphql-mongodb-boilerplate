'use strict'
import { IResolvers } from 'graphql-tools';
import {UserSchema, ChannelSchema, ChannelMessageSchema} from '../mongoose/schema'
import ChannelServiceImpl from '../service/ChannelServiceImpl'
import {IChannel, IChannelMessage, IAuthInfo, ISubscriptionMessage} from '../models'
import mongoose from 'mongoose';
const channelService = new ChannelServiceImpl();

const resolverMap: IResolvers = {
  Query: {
    getChannels(root: any, args: {pageSize: number, pageNo: number}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannel[]>{
      const {authInfo} = context
      const {pageSize, pageNo}= args;
      const limit = pageSize;
      const skip = (pageNo - 1) * pageSize;
      return channelService.getChannels({limit, skip});
    },
    getChannelMessages(root: any, args: {channelId: string, latestMessageId: string, size: number}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannelMessage[]> {
      const { authInfo } = context
      const { channelId, latestMessageId, size } = args
      const skip = 0;
      const limit = !isNaN(size) && size>0? size : 10
      const startAtPromise: Promise<Date> = latestMessageId?ChannelMessageSchema.findById(latestMessageId).then((m)=>m?m.createdAt:new Date()) : Promise.resolve(new Date())
      return startAtPromise.then((startAt)=>{
        if(!startAt){
          throw new Error('');
        }

        return ChannelMessageSchema.find({channelId: channelId, created: {"$gte": startAt}}, null, {limit, skip})
      })

      
    },
  },
  Mutation: {
    createChannel(root: any, args: {title: string, description: string}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannel> {
      const {title, description} = args;
      const {authInfo} = context;
      const channel = new ChannelSchema();
      channel.title = title
      channel.description = description
      channel.createdAt = new Date();
      channel.memberIds = [authInfo.id];

      return channel.save()
    },
    joinChannel(root: any, args: {channelId: string}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannel> {
      const {channelId} = args;
      const {authInfo} = context;
      return ChannelSchema.findById(channelId).then((channel)=>{

        if(!channel){
          throw new Error('channel is not exist')
        }
        channel?.memberIds.push(authInfo.id)
        channel.memberIds = Array.from(new Set(channel.memberIds))
        return channel.save()
      })
      
    },
    inviteMemberChannel(root: any, args: {channelId: string, userIds: [string]}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannel> {
      const {channelId, userIds} = args;
      const {authInfo} = context;
      return ChannelSchema.findById(channelId).then((channel)=>{

        if(!channel){
          throw new Error('channel is not exist')
        }
        if(!channel.invitedIds){
          channel.invitedIds = userIds
        } else {
          channel.invitedIds = channel.invitedIds.concat(userIds)
          channel.invitedIds = Array.from(new Set(channel.invitedIds))
        }
        
        
        return channel.save()
      })
    },
    publishChannelMessage(root: any, args: {channelId: string, payload: string}, context: {pubsub: any, authInfo: IAuthInfo}, info: any) : Promise<IChannelMessage> {
      const {pubsub, authInfo} = context;
      const {channelId, payload} = args
      //channelId 유효성 검사
      return ChannelSchema.findById(new mongoose.Types.ObjectId(channelId)).then((channel)=>{
        if(!channel || !channel.id){
          throw new Error('invalid channel')
        }
        const channelMessage = new ChannelMessageSchema({channelId, payload})
        channelMessage.userId = authInfo.id
        channelMessage.createdAt = new Date();
        
        return channelMessage.save().then((savedCm: IChannelMessage)=>{
            pubsub.publish(channelId, savedCm)
            return savedCm
        })
      })    
    },
  },
  Subscription: {
    channel: {
      resolve: (channelMessage: IChannelMessage) : Promise<ISubscriptionMessage> => {
        // make subscription message(currnet type channelMessage)
        console.log('subscription published', JSON.stringify(channelMessage))

        return ChannelSchema.findById(channelMessage.channelId).then((channel : any)=>{
          if(!channel){
            throw new Error('invalid channel')
          }
          const response : ISubscriptionMessage = {
            channel,
            message: [channelMessage],
            createdAt: new Date()
          }
          return response
        })  
        
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