'use strict'

import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { ConnectionContext } from 'subscriptions-transport-ws';
import WebSocket from 'ws';
import depthLimit from 'graphql-depth-limit';
import schema from './graphql/schema';
import {verifyAccessToken, generateAccessToken} from './authorizer'
import logger from './common/logger'
import {onConnect, onDisconnect, onRequest, pubsub} from './graphqlContext'
import connectionService from './service/ConnectionServiceImpl'
//const pubsub = new PubSub();

const apolloServer = new ApolloServer({
	schema,
	validationRules: [depthLimit(7)],
	introspection: true,
	formatError: (err) => {
		//logger.error(err)
		console.error('formatError', err.message, err.stack)
		return new Error(`Error ${err.message}`);
	},
	playground: {
		subscriptionEndpoint: '/graphql'
	},
	subscriptions: {
		keepAlive: 1000,
		onConnect,
		onDisconnect,
	},
	context: onRequest
});

export default apolloServer