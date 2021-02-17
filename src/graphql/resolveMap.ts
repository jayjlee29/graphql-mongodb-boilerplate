'use strict'
import { IResolvers } from 'graphql-tools';
import {UserSchema, ChannelSchema, ChannelMessageSchema, ChannelMemberSchema} from '../mongoose/schema'
import ChannelServiceImpl from '../service/ChannelServiceImpl'
import {IChannel, IChannelMessage, IAuthInfo, ISubscriptionMessage, IConnection, IChannelMember} from '../models'
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
      const startAtPromise: Promise<Date> = latestMessageId?ChannelMessageSchema.findById(latestMessageId).then((m)=>m?m.createdAt:new Date()) : Promise.resolve(new Date(0))
      return startAtPromise.then((startAt)=>{
        if(!startAt){
          throw new Error('');
        }
        console.log('startAt', startAt)
        return ChannelMessageSchema.find({channelId: channelId, createdAt: {"$gte": startAt}}, null, {limit, skip}).sort({createdAt: -1})
      })

      
    },
  },
  Mutation: {
    createChannel(root: any, args: {title: string, description: string}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannel> {
      const {authInfo} = context;
      const {title, description} = args;
      return channelService.createChannel({title, description}, authInfo);
    },
    joinChannel(root: any, args: {channelId: string}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannelMember[]> {
      const {channelId} = args;
      const {authInfo} = context;
      return channelService.joinChannel(channelId, authInfo).then((channelMember: IChannelMember)=>{
        return channelService.getChannelMembers({channelId, limit: 100, skip: 0})
      })
      
    },
    inviteChannelMember(root: any, args: {channelId: string, userIds: [string]}, context: {authInfo: IAuthInfo}, info: any) : Promise<IChannelMember[]> {
      const {channelId, userIds} = args;
      const {authInfo} = context;
      return channelService.inviteChannel(channelId, authInfo, userIds).then((members: IChannelMember[])=>{
        return channelService.getChannelMembers({channelId, limit: 100, skip: 0})
      })
    },
    publishChannelMessage(root: any, args: {channelId: string, payload: string}, context: {pubsub: any, authInfo: IAuthInfo}, info: any) : Promise<IChannelMessage> {
      const {pubsub, authInfo} = context;
      const {channelId, payload} = args
      console.log('authInfo', JSON.stringify(authInfo))
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

        if(!channelMessage){
          return Promise.reject(new Error('message is null'));
        }

        return ChannelSchema.findById(channelMessage.channelId).then((channel : any)=>{
          if(!channel){
            throw new Error('invalid channel')
          }

          return ChannelMemberSchema.find({channelId: channel.id, status: "ACTIVE"}, null).then((targets: IChannelMember[])=>{
            const response : ISubscriptionMessage = {
              channel,
              message: [channelMessage],
              targets,
              createdAt: new Date()
            }
            return response
          })
          
        })  
        
      },
      subscribe: (root: any, args: any, context: {pubsub: any, authInfo: IAuthInfo, connection: IConnection}, info: Object) => {
        const { pubsub, authInfo, connection } = context;
        const { channelId } = args
        console.log('subscribe', channelId, connection)
        if(!authInfo || !authInfo.id){
          throw new Error('UnAuthorized')
        }
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