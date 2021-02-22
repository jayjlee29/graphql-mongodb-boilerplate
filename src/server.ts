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
const logger = getLogger(__filename.slice(__dirname.length + 1));
logger.level = "debug"
const TOKEN_EXPIRES_IN = 60*60*24

console.log = (...args: any[]) => {
  
  logger.debug(args)
}

console.error = (...args: any[]) =>{
  logger.error(args)
}

//monodb connect
connect();

//express + apollo
const port = process.env.PORT || 8000;
const expressServer = express();

//express use, get
expressServer.use('*', cors());
expressServer.use(compression());
expressServer.get('/signin/anonymous', async (req: any, res)=>{
  const displayName: string = req.query.displayName;

  if(!displayName || displayName === '' || displayName === 'undefined' || displayName === 'null'){
    throw new Error('displayName is null')
  }
  const user: IUser = {
    userId: `${displayName}-${getRandomId()}`,
    displayName,
    createdAt: new Date()
  }

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
})

expressServer.get('/accessToken/:mode', async (req: any, res)=>{
  const {mode} = req.params;
  if('anonymous' != mode){
    throw new Error('does\'t supported mode');
  }
  const {displayName, id} = req.query
//  const idToken: string = query.idToken || '';
  if(!id || id === '' || id === 'undefined' || id === 'null'){
    throw new Error('id is null')
  }


  const user: IUser = {
    userId: `${id}`,
    displayName: `${displayName}`,
    createdAt: new Date()
  }
 
  const {accessToken, expiredAt} = generateAccessToken(user, TOKEN_EXPIRES_IN)
  

  const body = {
    accessToken,
    expiredAt,
    user
  }
  //console.log('generated accessToken', id)
  res.json(body)

})

expressServer.use((err: Error, req: any, res: any, next: any)=>{
  logger.error('middleware error', err);
  if(res.headersSent){
    return next(err)
  }
  res.status(500).send({error: err.message});
  //res.render('error', { error: err });
})
//expressServer.use('/graphql', bodyParser.json());
// end express use, get

const httpServer = createServer(expressServer);

// for query, mutation
apolloServer.applyMiddleware({ app: expressServer });
// for subscription
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({port}, ()=>{
  console.log(`start graphql server http://localhost:${port}/graphql, subscription endpoint : ${apolloServer.subscriptionsPath}`)

  const hostname = os.hostname();
  //const tokenInfo =  JSON.stringify({userId: hostname, accessToken: generateAccessToken(hostname, 60*60*24)})
  //console.log(tokenInfo)
  console.log('hostname', hostname)
})


