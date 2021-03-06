'use strict'
import { IResolvers } from 'graphql-tools';
import {UserSchema, ChannelSchema, ChannelMessageSchema, ChannelMemberSchema, SentChannelMessageSchema} from '../mongoose/schema'
import channelService from '../service/ChannelServiceImpl'
import {IChannel, IChannelMessage, IAuthInfo, ISubscriptionMessage, IConnection, IChannelMember, ISentChannelMessage} from '../models'
import mongoose from 'mongoose';
import logger from '../common/logger'

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
          throw new Error('startAt is null');
        }
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
      logger.info('authInfo', JSON.stringify(authInfo))
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
      resolve: (channelMessage: IChannelMessage, args: any, context: {pubsub: any, authInfo: IAuthInfo, connection: IConnection}, info) : Promise<ISubscriptionMessage> => {
        const {authInfo, connection} = context;
        logger.info('published', JSON.stringify(channelMessage), authInfo)

        if(!channelMessage){
          return Promise.reject(new Error('message is null'));
        }

        return ChannelSchema.findById(channelMessage.channelId).then((channel : any)=>{
          if(!channel){
            throw new Error('invalid channel')
          }

          return ChannelMemberSchema.find({channelId: channel.id, status: "ACTIVE"}, null)
            .then((targetMembers: IChannelMember[])=>{

              const saveSentHist = (channelMembers: IChannelMember[]) => {
                return new Promise((resolve, reject)=>{
                  const sentHistSchema : ISentChannelMessage[] = channelMembers.map((channelMember: IChannelMember)=>{
                    const schema = new  SentChannelMessageSchema()
                    
                    schema.channelId = channel.id
                    schema.messageId = channelMessage.id
                    schema.fromUserId = channelMessage.userId
                    schema.userId = channelMember.userId
                      
                    return schema;
                  })

                  SentChannelMessageSchema.insertMany(sentHistSchema).then(resolve).catch(reject);

                })
              }
                
                
              return saveSentHist(targetMembers).then((results)=>{
                const response : ISubscriptionMessage = {
                  channel,
                  message: [channelMessage],
                  targets: targetMembers,
                  createdAt: new Date()
                }
                return response
              })
            })
 
        })  
        
      },
      subscribe: (root: any, args: any, context: {pubsub: any, authInfo: IAuthInfo, connection: IConnection}, info: Object) => {
        const { pubsub, authInfo, connection } = context;
        const { channelId } = args
        logger.info('join channel', channelId, connection, authInfo)
        if(!authInfo || !authInfo.id){
          throw new Error('UnAuthorized')
        }
        if(pubsub && channelId){
          const msg : IChannelMessage = {
            id: '',
            channelId: channelId,
            userId: '',
            payload: 'welcome',
            createdAt: new Date()
          }
          pubsub.publish(channelId, msg)
          return pubsub.asyncIterator(channelId)
        } else {
          throw new Error(`Error subscribe ${authInfo}`)
        }
      }
    }
  }
  
};
export default resolverMap;