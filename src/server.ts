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

const logger = getLogger(__filename.slice(__dirname.length + 1));
logger.level = "debug"
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
expressServer.get('/accessToken/test', (req: any, res)=>{
  const query = req.query
  const idToken: string = query.idToken || '';
  if(!idToken || idToken === '' || idToken === 'undefined' || idToken === 'null'){
    throw new Error('idToken is null')
  }

  const t = 5 //60*60*24
  const accessToken = generateAccessToken(idToken, t)
  const expiredAt = Date.now() + (t * 1000)
  const body = {
    accessToken,
    expiredAt
  }
  console.log('generated accessToken', idToken)
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
  const tokenInfo =  JSON.stringify({userId: hostname, accessToken: generateAccessToken(hostname, 60*60*24)})
  console.log(tokenInfo)
  console.log('hostname', hostname)
})


