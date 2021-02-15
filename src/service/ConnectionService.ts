'use strict'
import {IConnection, IAuthInfo} from '../models'

interface ConnectionService {
    createConnection(connectionId: string, authInfo: IAuthInfo): Promise<IConnection>
    releaseConnection(connection : IConnection): Promise<void>

}

export default ConnectionService