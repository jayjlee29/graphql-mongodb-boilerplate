'use strict'
import os from 'os'

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser'
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

import compression from 'compression';
import cors from 'cors';
import connect from './mongoose/connect'
import {verifyAccessToken, generateAccessToken} from './authorizer'
import schema from './graphql/schema';
import {IAuthInfo} from './models'

//monodb connect
connect();

//express + apollo
const port = process.env.PORT || 8000;
const expressServer = express();
expressServer.use('*', cors());
expressServer.use(compression());


const pubsub = new PubSub();
const apolloServer = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: {
    subscriptionEndpoint: '/graphql'
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      return {
        pubsub
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
  },
  formatError: (err) => {
    console.error(JSON.stringify(err))
    return err;
  }
});


// restapi
/**
 * generate accessToken for test(24h expired)
 */
expressServer.get('/accessToken/test', (req: any, res)=>{
  const query = req.query
  const userId: string = query.userId || '';
  const accessToken = generateAccessToken(userId, 60*60*24)
  const expiredAt = Date.now() + (60*60*2 * 1000)
  const body = {
    accessToken,
    expiredAt
  }
  res.json(body)
  
  
})

expressServer.use('/graphql', bodyParser.json());
// graphql
apolloServer.applyMiddleware({ app: expressServer });


//create & listen http server
const httpServer = createServer(expressServer);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({port}, ()=>{
  console.log(`start graphql server http://localhost:${port}/graphql, subscription endpoint : ${apolloServer.subscriptionsPath}`)

  const hostname = os.hostname();
  const tokenInfo =  JSON.stringify({userId: hostname, accessToken: generateAccessToken(hostname, 60*60*24)})
  console.log('tokenInfo', tokenInfo)
})

