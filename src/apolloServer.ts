'use strict'

import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { ConnectionContext } from 'subscriptions-transport-ws';
import * as WebSocket from 'ws';
import depthLimit from 'graphql-depth-limit';
import schema from './graphql/schema';
import ConnectionServiceImpl from './service/ConnectionServiceImpl'
import {verifyAccessToken, generateAccessToken} from './authorizer'
import {IAuthInfo, IConnection} from './models'

const connectionService = new ConnectionServiceImpl();
const pubsub = new PubSub();

const apolloServer = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  introspection: true,
  formatError: (err) => {
    //logger.error(err)
    console.error('formatError')
    return new Error(`Error`);
  },
  playground: {
    subscriptionEndpoint: '/graphql'
  },
  subscriptions: {
    keepAlive: 1000,
    onConnect: (connectionParams: any, ws)=> {
      if(connectionParams && connectionParams.authToken){
        const {connectionId} = connectionParams;
        console.log('connectionId', connectionId)
        
        return verifyAccessToken(connectionParams.authToken).then((authInfo: IAuthInfo)=>{
            return connectionService.createConnection(connectionId, authInfo).then((connection : IConnection)=>{
            console.log('onConnect connection', connection)
            console.log('onConnect authInfo', authInfo)
            connection.ws = ws
            return {pubsub, authInfo, connection}
          })
        }).catch((error)=>{
          throw new Error(`Error OnConnect : ${error}`);
        });
      } 
      
      throw new Error('Error OnConnect : Unknown')

    },
    onDisconnect: async (websocket, context: ConnectionContext) => {
      
      const initialContext = await context.initPromise;
      const {authInfo, connection} = initialContext;
      console.log('onDisconnection authInfo', JSON.stringify(authInfo))
      console.log('onDisconnection connection', JSON.stringify(connection))
      if(connection){
        await connectionService.releaseConnection(connection)
      }
    },
    
  },
  context: ({ req, connection }) => {
    
    return new Promise((resolve, reject)=>{
      try{
        
        if(connection){        
          return resolve(Object.assign({pubsub}, connection.context));
        } else {
          const token = req.headers.authorization || '';
        
          if(token){
            return verifyAccessToken(token).then((authInfo) => { 
              return resolve({authInfo, pubsub})
            }).catch((err)=>{
              reject(err)
            });

          }
        }
      } catch(e){
        console.error(e)
      }
      
      return resolve({pubsub})
    })
  }
});

export default apolloServer