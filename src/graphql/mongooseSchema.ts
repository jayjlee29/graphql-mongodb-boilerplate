'use strict'
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import {User, Channel, Connection, ChannelMessage} from '../mongoose/models'

const UserTC = composeMongoose(User, {});
const ChannelTC = composeMongoose(Channel, {});
const ChannelMessageTC = composeMongoose(ChannelMessage, {});
const ConnectionTC = composeMongoose(Connection, {});

//User
schemaComposer.Query.addNestedFields({
    "User.findById": UserTC.mongooseResolvers.findById(),
    "User.findByIds": UserTC.mongooseResolvers.findByIds(),
    "User.findOne": UserTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
        console.log(JSON.stringify(rp.args));
        console.log(JSON.stringify(rp.context));
        return next(rp);
    }),
    "User.findMany": UserTC.mongooseResolvers.findMany(),
    //"User.userDataLoader": UserTC.mongooseResolvers.dataLoader(),
    //"User.userDataLoaderMany": UserTC.mongooseResolvers.dataLoaderMany(),
    // userByIdLean: UserTC.mongooseResolvers.findByIdLean(),
    // userByIdsLean: UserTC.mongooseResolvers.findByIdsLean(),
    // userOneLean: UserTC.mongooseResolvers.findOneLean(),
    // userManyLean: UserTC.mongooseResolvers.findManyLean(),
    // userDataLoaderLean: UserTC.mongooseResolvers.dataLoaderLean(),
    // userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderManyLean(),
    "User.count": UserTC.mongooseResolvers.count(),
    "User.connection": UserTC.mongooseResolvers.connection(),
    "User.pagination": UserTC.mongooseResolvers.pagination(),
    
});
  
schemaComposer.Mutation.addNestedFields({
    "User.createOne": UserTC.mongooseResolvers.createOne(),
    "User.createMany": UserTC.mongooseResolvers.createMany(),
    "User.updateById": UserTC.mongooseResolvers.updateById(),
    "User.updateOne": UserTC.mongooseResolvers.updateOne(),
    "User.updateMany": UserTC.mongooseResolvers.updateMany(),
    "User.removeById": UserTC.mongooseResolvers.removeById(),
    "User.removeOne": UserTC.mongooseResolvers.removeOne(),
    "User.removeMany": UserTC.mongooseResolvers.removeMany()
});
// end User

//Connection
schemaComposer.Query.addNestedFields({
    "Connection.findById": ConnectionTC.mongooseResolvers.findById(),
    "Connection.findByIds": ConnectionTC.mongooseResolvers.findByIds(),
    "Connection.findOne": ConnectionTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
        console.log(JSON.stringify(rp.args));
        console.log(JSON.stringify(rp.context));
        return next(rp);
    }),
    "Connection.findMany": ConnectionTC.mongooseResolvers.findMany(),
    //"User.userDataLoader": UserTC.mongooseResolvers.dataLoader(),
    //"User.userDataLoaderMany": UserTC.mongooseResolvers.dataLoaderMany(),
    // userByIdLean: UserTC.mongooseResolvers.findByIdLean(),
    // userByIdsLean: UserTC.mongooseResolvers.findByIdsLean(),
    // userOneLean: UserTC.mongooseResolvers.findOneLean(),
    // userManyLean: UserTC.mongooseResolvers.findManyLean(),
    // userDataLoaderLean: UserTC.mongooseResolvers.dataLoaderLean(),
    // userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderManyLean(),
    "Connection.count": ConnectionTC.mongooseResolvers.count(),
    "Connection.connection": ConnectionTC.mongooseResolvers.connection(),
    "Connection.pagination": UserTC.mongooseResolvers.pagination(),
    
});
  
schemaComposer.Mutation.addNestedFields({
    "Connection.createOne": ConnectionTC.mongooseResolvers.createOne(),
    "Connection.createMany": ConnectionTC.mongooseResolvers.createMany(),
    "Connection.updateById": ConnectionTC.mongooseResolvers.updateById(),
    "Connection.updateOne": ConnectionTC.mongooseResolvers.updateOne(),
    "Connection.updateMany": ConnectionTC.mongooseResolvers.updateMany(),
    "Connection.removeById": ConnectionTC.mongooseResolvers.removeById(),
    "Connection.removeOne": ConnectionTC.mongooseResolvers.removeOne(),
    "Connection.removeMany": ConnectionTC.mongooseResolvers.removeMany()
});
// end Connection

//Channel
schemaComposer.Query.addNestedFields({
    "Channel.findById": ChannelTC.mongooseResolvers.findById(),
    "Channel.findByIds": ChannelTC.mongooseResolvers.findByIds(),
    "Channel.findOne": ChannelTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
        console.log(JSON.stringify(rp.args));
        console.log(JSON.stringify(rp.context));
        return next(rp);
    }),
    "Channel.findMany": ChannelTC.mongooseResolvers.findMany(),
    //"User.userDataLoader": UserTC.mongooseResolvers.dataLoader(),
    //"User.userDataLoaderMany": UserTC.mongooseResolvers.dataLoaderMany(),
    // userByIdLean: UserTC.mongooseResolvers.findByIdLean(),
    // userByIdsLean: UserTC.mongooseResolvers.findByIdsLean(),
    // userOneLean: UserTC.mongooseResolvers.findOneLean(),
    // userManyLean: UserTC.mongooseResolvers.findManyLean(),
    // userDataLoaderLean: UserTC.mongooseResolvers.dataLoaderLean(),
    // userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderManyLean(),
    "Channel.count": ChannelTC.mongooseResolvers.count(),
    "Channel.connection": ChannelTC.mongooseResolvers.connection(),
    "Channel.pagination": ChannelTC.mongooseResolvers.pagination(),
    
});
  
schemaComposer.Mutation.addNestedFields({
    "Channel.createOne": ChannelTC.mongooseResolvers.createOne(),
    "Channel.createMany": ChannelTC.mongooseResolvers.createMany(),
    "Channel.updateById": ChannelTC.mongooseResolvers.updateById(),
    "Channel.updateOne": ChannelTC.mongooseResolvers.updateOne(),
    "Channel.updateMany": ChannelTC.mongooseResolvers.updateMany(),
    "Channel.removeById": ChannelTC.mongooseResolvers.removeById(),
    "Channel.removeOne": ChannelTC.mongooseResolvers.removeOne(),
    "Channel.removeMany": ChannelTC.mongooseResolvers.removeMany()
});
// end Channel

//Channel Message
schemaComposer.Query.addNestedFields({
    "ChannelMessage.findById": ChannelMessageTC.mongooseResolvers.findById(),
    "ChannelMessage.findByIds": ChannelMessageTC.mongooseResolvers.findByIds(),
    "ChannelMessage.findOne": ChannelMessageTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
        console.log(JSON.stringify(rp.args));
        console.log(JSON.stringify(rp.context));
        return next(rp);
    }),
    "ChannelMessage.findMany": ChannelMessageTC.mongooseResolvers.findMany(),
    //"User.userDataLoader": UserTC.mongooseResolvers.dataLoader(),
    //"User.userDataLoaderMany": UserTC.mongooseResolvers.dataLoaderMany(),
    // userByIdLean: UserTC.mongooseResolvers.findByIdLean(),
    // userByIdsLean: UserTC.mongooseResolvers.findByIdsLean(),
    // userOneLean: UserTC.mongooseResolvers.findOneLean(),
    // userManyLean: UserTC.mongooseResolvers.findManyLean(),
    // userDataLoaderLean: UserTC.mongooseResolvers.dataLoaderLean(),
    // userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderManyLean(),
    "ChannelMessage.count": ChannelMessageTC.mongooseResolvers.count(),
    "ChannelMessage.connection": ChannelMessageTC.mongooseResolvers.connection(),
    "ChannelMessage.pagination": ChannelMessageTC.mongooseResolvers.pagination(),
    
});
  
schemaComposer.Mutation.addNestedFields({
    "ChannelMessage.createOne": ChannelMessageTC.mongooseResolvers.createOne(),
    "ChannelMessage.createMany": ChannelMessageTC.mongooseResolvers.createMany(),
    "ChannelMessage.updateById": ChannelMessageTC.mongooseResolvers.updateById(),
    "ChannelMessage.updateOne": ChannelMessageTC.mongooseResolvers.updateOne(),
    "ChannelMessage.updateMany": ChannelMessageTC.mongooseResolvers.updateMany(),
    "ChannelMessage.removeById": ChannelMessageTC.mongooseResolvers.removeById(),
    "ChannelMessage.removeOne": ChannelMessageTC.mongooseResolvers.removeOne(),
    "ChannelMessage.removeMany": ChannelMessageTC.mongooseResolvers.removeMany()
});
// end Channel Message

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;