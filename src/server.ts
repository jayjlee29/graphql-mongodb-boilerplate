'use strict'
import os from 'os'
import express from 'express';
import bodyParser from 'body-parser'
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import connect from './mongoose/connect'
import { configure, getLogger } from "log4js";
import apolloServer from './apolloServer'
import {generateAccessToken} from './authorizer'
import {getRandomId} from './common/utils'
import {IUser} from './models'
import userService from './service/UserServiceImpl'
import logger from './common/logger'

const TOKEN_EXPIRES_IN = 60;	//60s //60*60*24 //24h

//monodb connect
connect();

//express + apollo
const port = process.env.PORT || 8000;
const expressServer = express();

//express use, get
expressServer.use(cors());
expressServer.use(compression());
expressServer.get('/signin/anonymous', async (req: any, res, next)=>{
	const displayName: string = req.query.displayName;

	if(!displayName || displayName === '' || displayName === 'undefined' || displayName === 'null'){
		throw new Error('displayName is null')
	}
	const user: IUser = {
		id: `${displayName}-${getRandomId()}`,
		displayName,
		createdAt: new Date()
	}
	try{
		const savedUser = await userService.saveUser(user);
		console.log('savedUser', savedUser);
		
		const {accessToken, expiredAt} = generateAccessToken(user, TOKEN_EXPIRES_IN)
		
		const body = {
			accessToken,
			expiredAt,
			user
		}
		console.log('anonymous sign-in', displayName)
		res.json(body)
	} catch(err){
		console.log('Error Signin', err)
		next(new Error('Error Sigin'))
	}
	
})

expressServer.get('/accessToken/:mode', (req: any, res, next)=>{
	const {mode} = req.params;
	if('anonymous' != mode){
		throw new Error('does\'t supported mode');
	}
	const {displayName, id} = req.query
	//  const idToken: string = query.idToken || '';
	if(!id || id === '' || id === 'undefined' || id === 'null'){
		throw new Error('id is null')
	}
	userService.getUser(id).then((user: IUser)=>{
		const {accessToken, expiredAt} = generateAccessToken(user, TOKEN_EXPIRES_IN)
		const body = {
			accessToken,
			expiredAt,
			user
		}
		//console.log('generated accessToken', id)
		res.json(body)
	}).catch((err)=>{
		console.error('Error accessToken', err)
		next(new Error('Error GenerateAccessToken'))
	})

})

expressServer.use((err: Error, req: any, res: any, next: any)=>{
  logger.error('Error  Middleware', err);
  if(res.headersSent){
    return next(err)
  }
  res.status(500).send({error: err.message});

})

// end express use, get

const httpServer = createServer(expressServer);

// for query, mutation
apolloServer.applyMiddleware({ app: expressServer });
// for subscription
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({port}, ()=>{
	logger?.info(`start graphql server http://localhost:${port}/graphql, subscription endpoint : ${apolloServer.subscriptionsPath}`)

  const hostname = os.hostname();
  //const tokenInfo =  JSON.stringify({userId: hostname, accessToken: generateAccessToken(hostname, 60*60*24)})
  //console.log(tokenInfo)
  logger.info('hostname', hostname)
})


