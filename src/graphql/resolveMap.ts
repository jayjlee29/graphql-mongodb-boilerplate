'use strict'
import { IResolvers } from 'graphql-tools';
import {UserSchema, ChannelSchema, ChannelMessageSchema} from '../mongoose/schema'
import ChannelServiceImpl from '../service/ChannelServiceImpl'
const channelService = new ChannelServiceImpl();

const resolverMap: IResolvers = {
  Query: {
    getChannels(root: any, args: {limit: number, skip: number}, context: any, info: any) {
      const {pubsub} = context
      const { limit, skip } = args     
      return channelService.getChannels({limit, skip: 0});
    },
    getChannelMessages(root: any, args: any, context: any, info: any) {
      const {pubsub} = context
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
    publishChannelMessage(root: any, args: any, context: any, info: any) {
      const {pubsub} = context;
      const {channelId, payload} = args;
      const messageBody = Object.assign(payload, {channelId, sent: Date.now()})
      //channelId 유효성 검사

      return ChannelSchema.findById(channelId).then((channel: any)=>{
        console.log('findById', channel)
        const cm = new ChannelMessageSchema()

        return cm.save(messageBody)
          .then((channelMessage: any)=>{
            pubsub.publish(channelId, messageBody)
            return {
              channelId,
              payload: messageBody
            }
        }).catch((e: Error)=>{
          throw e
        })
      }).catch((e: Error)=>{
        console.error(e);
      });      
    },
  },
  Subscription: {
    channel: {
      resolve: (data: any) => {
        // make subscription message
        const { channelId } = data;
        return {
          channelId,
          payload: data,
          server: Date.now()
        }
      },
      subscribe: (root: any, args: any, context: any, info: Object) => {
        const { pubsub } = context;
        const { channelId } = args
        if(pubsub){
          return pubsub.asyncIterator(channelId)
        }

        throw new Error('pubsub is null')
        
      }
    }
  }
  
};
export default resolverMap;