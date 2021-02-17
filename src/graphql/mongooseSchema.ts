'use strict'
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import {UserSchema, ChannelSchema, ConnectionSchema, ChannelMessageSchema, ChannelMemberSchema} from '../mongoose/schema'
import {IAuthInfo} from '../models'

const UserTC = composeMongoose(UserSchema, {});
const ChannelTC = composeMongoose(ChannelSchema, {});
const ChannelMessageTC = composeMongoose(ChannelMessageSchema, {});
const ConnectionTC = composeMongoose(ConnectionSchema, {});

const ChannelMemberTC = composeMongoose(ChannelMemberSchema, {});
//virtual get id
UserTC.addFields({
    id: 'ID'
})
ChannelTC.addFields({
    id: 'ID'
})
ChannelMessageTC.addFields({
    id: 'ID'
})
ConnectionTC.addFields({
     id: 'ID'
})
ChannelMemberTC.addFields({
    id: 'ID'
})
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
    "User.createOne": UserTC.mongooseResolvers.createOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.createMany": UserTC.mongooseResolvers.createMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.updateById": UserTC.mongooseResolvers.updateById().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.updateOne": UserTC.mongooseResolvers.updateOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.updateMany": UserTC.mongooseResolvers.updateMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.removeById": UserTC.mongooseResolvers.removeById().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.removeOne": UserTC.mongooseResolvers.removeOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "User.removeMany": UserTC.mongooseResolvers.removeMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    })
});
// end User

//Connection
schemaComposer.Query.addNestedFields({
    "Connection.findById": ConnectionTC.mongooseResolvers.findById(),
    "Connection.findByIds": ConnectionTC.mongooseResolvers.findByIds(),
    "Connection.findOne": ConnectionTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
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
    "Connection.createOne": ConnectionTC.mongooseResolvers.createOne().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.createMany": ConnectionTC.mongooseResolvers.createMany().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.updateById": ConnectionTC.mongooseResolvers.updateById().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.updateOne": ConnectionTC.mongooseResolvers.updateOne().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.updateMany": ConnectionTC.mongooseResolvers.updateMany().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.removeById": ConnectionTC.mongooseResolvers.removeById().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.removeOne": ConnectionTC.mongooseResolvers.removeOne().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    }),
    "Connection.removeMany": ConnectionTC.mongooseResolvers.removeMany().wrapResolve(next=>rp=>{
        if(rp.context.claims){
            rp.args = wrappingClaim(rp.args, rp.context.claims)
        }
        return next(rp);
    })
});
// end Connection

//Channel
schemaComposer.Query.addNestedFields({
    "Channel.findById": ChannelTC.mongooseResolvers.findById(),
    "Channel.findByIds": ChannelTC.mongooseResolvers.findByIds(),
    "Channel.findOne": ChannelTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
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
    "Channel.createOne": ChannelTC.mongooseResolvers.createOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.createMany": ChannelTC.mongooseResolvers.createMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.updateById": ChannelTC.mongooseResolvers.updateById().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.updateOne": ChannelTC.mongooseResolvers.updateOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.updateMany": ChannelTC.mongooseResolvers.updateMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.removeById": ChannelTC.mongooseResolvers.removeById().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.removeOne": ChannelTC.mongooseResolvers.removeOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "Channel.removeMany": ChannelTC.mongooseResolvers.removeMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    })
});
// end Channel

//Channel Message
schemaComposer.Query.addNestedFields({
    "ChannelMessage.findById": ChannelMessageTC.mongooseResolvers.findById(),
    "ChannelMessage.findByIds": ChannelMessageTC.mongooseResolvers.findByIds(),
    "ChannelMessage.findOne": ChannelMessageTC.mongooseResolvers.findOne().wrapResolve(next=>rp=>{
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
    "ChannelMessage.createOne": ChannelMessageTC.mongooseResolvers.createOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        console.log('rp.args', JSON.stringify(rp.args))
        return next(rp);
    }),
    "ChannelMessage.createMany": ChannelMessageTC.mongooseResolvers.createMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "ChannelMessage.updateById": ChannelMessageTC.mongooseResolvers.updateById().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "ChannelMessage.updateOne": ChannelMessageTC.mongooseResolvers.updateOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "ChannelMessage.updateMany": ChannelMessageTC.mongooseResolvers.updateMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "ChannelMessage.removeById": ChannelMessageTC.mongooseResolvers.removeById().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "ChannelMessage.removeOne": ChannelMessageTC.mongooseResolvers.removeOne().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    }),
    "ChannelMessage.removeMany": ChannelMessageTC.mongooseResolvers.removeMany().wrapResolve(next=>rp=>{
        if(rp.context){
            rp.args = wrappingClaim(rp.args, rp.context)
        }
        return next(rp);
    })
});
// end Channel Message

schemaComposer.Query.addNestedFields({
    "ChannelMember.findById": ChannelMemberTC.mongooseResolvers.findById()
})

const wrappingClaim = (args: {record: any}, context: {authInfo: IAuthInfo}) => {
    const {record} = args
    const {authInfo} = context;
    const mergedParams = Object.assign(record, {userId: authInfo.id})
    return {record: mergedParams};

}

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
