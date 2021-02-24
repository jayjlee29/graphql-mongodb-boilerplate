'use strict'
import {ConnectionSchema} from '../mongoose/schema'
import {IConnection, IAuthInfo} from '../models'
import ConnectionService from './ConnectionService'
import { nanoid } from 'nanoid'

class ConnectionServiceImpl implements ConnectionService{
    
    private static _instance: ConnectionService = new ConnectionServiceImpl();

	private constructor() {
		ConnectionServiceImpl._instance = this;
	}

	static getInstance() : ConnectionService{
		if (!ConnectionServiceImpl._instance) {
			ConnectionServiceImpl._instance = new ConnectionServiceImpl();
		}
		return this._instance;
	}

    createConnection(id: string, authInfo: IAuthInfo): Promise<IConnection> {

        const createConn = () => {

            const connectionSchema = new ConnectionSchema();
            connectionSchema._id = nanoid();
            connectionSchema.createdAt = new Date();
            connectionSchema.userId = authInfo.id;
            return connectionSchema.save().catch((error)=>{
                throw new Error(`Error createConnection ${error}`)
            })
        }

        if(id){
            return ConnectionSchema.findById(id).then((conn : IConnection | null)=>{
                if(conn){
                    return Promise.resolve(conn);
                } else {
                    return createConn()
                }
                    
            })
        } else {
            return createConn();
        }
        

    }

    releaseConnection(connection: IConnection) : Promise<void> {
        
        return ConnectionSchema.findById(connection.id).then((conn: IConnection | null)=>{

            if(conn){
                return ConnectionSchema.deleteOne(conn)
            } else {
                return;
            }

        }).then((data)=>{
            return ;
        })
    }
}

export default ConnectionServiceImpl.getInstance()