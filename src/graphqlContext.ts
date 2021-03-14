import { ConnectionContext } from 'subscriptions-transport-ws';
import connectionService from './service/ConnectionServiceImpl'
import {verifyAccessToken, generateAccessToken} from './authorizer'
import {IAuthInfo, IConnection} from './models'
import logger from './common/logger'
import { PubSub } from 'graphql-subscriptions';
import WebSocket from 'ws';

const pubsub = new PubSub();


function onConnect(connectionParams: any, ws: WebSocket, context :ConnectionContext) : any {
    if(connectionParams && connectionParams.authToken){
        const {connectionId} = connectionParams;
        logger.info('onConnect', connectionParams)

        return verifyAccessToken(connectionParams.authToken)
        .then((authInfo: IAuthInfo)=>{
                return connectionService.createConnection(connectionId, authInfo).then((connection : IConnection)=>{
                //console.log('onConnect connection', connection, authInfo)
                
                connection.ws = ws
                return {pubsub, authInfo, connection}
            })
        }).catch((error)=>{
            throw new Error(`Error OnConnect : ${error}`);
        });
    } 

    throw new Error('Error OnConnect : Unknown')

}

async function onDisconnect(websocket: WebSocket, context: ConnectionContext) {

    const initialContext = await context.initPromise;
    const {authInfo, connection} = initialContext;
    logger.info('onDisconnection', JSON.stringify(connection), JSON.stringify(authInfo))

    if(connection){
        await connectionService.releaseConnection(connection)
    }
}

function onRequest(arg: {req: any, connection: any }) {
    const {req, connection} = arg;
    return new Promise((resolve, reject)=>{
			
        try{
            
            if(connection) {
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


export { onConnect, onDisconnect, onRequest, pubsub}