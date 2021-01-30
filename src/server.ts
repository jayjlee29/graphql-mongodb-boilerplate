import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser'
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
//import { PubSub } from 'graphql-subscriptions';

import compression from 'compression';
import cors from 'cors';
import connect from './mongoose/connect'
import authorizer from './authorizer'

import schema from './graphql/schema';
import { PubSub } from 'graphql-subscriptions';

//monodb connect
connect();

//express + apollo
const port = 8000;
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
    //console.log('oncontext', JSON.stringify(connection))
    if(connection){
      return Object.assign({pubsub}, connection.context);
    } else {
      const token = req.headers.authorization || '';
      let claims = null;
      if(token){
        const decodedAuthorization = authorizer(token);
      }
      return {claims, pubsub};  
    }
  }
});


// restapi
expressServer.get('/', (req, res)=>{
  res.send('hello !!')
})
expressServer.use('/graphql', bodyParser.json());
// graphql
apolloServer.applyMiddleware({ app: expressServer });


//create & listen http server
const httpServer = createServer(expressServer);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({port}, ()=>{
  console.log('start server ' + port)
  console.log('start server subscriptionsPath ' + apolloServer.subscriptionsPath);
})
/*
httpServer.listen(
  {port},
  () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema: schema
    }, {
      server: httpServer,
      path: '/subscriptions',
    });
  }
  
);
*/

