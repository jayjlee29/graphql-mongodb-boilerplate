'use strict'
import * as jwt from 'jsonwebtoken';
import {IAuthInfo, IUser} from './models'
import logger from './common/logger'
const SECRET: string = process.env.SECRET || ''
const ISSUER: string = 'tenwell.com'
const verifyAccessToken = (authorization: string) :  Promise<IAuthInfo> => {
    
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        const secret = process.env.SECRET + '';
        return new Promise((resolve, reject)=>{

            jwt.verify(token, secret, (err: any, decoded: IUser | any) => {
                if (err) {
                    console.error(err);
                    reject(new Error('JWT is not verified'));
                } else {
                    
                    logger.info('verified', JSON.stringify(decoded))

                    if(!decoded.id){
                        throw new Error('invalid JWT')
                    }
                    const authInfo : IAuthInfo = {
                        id: decoded.id,
                        displayName: decoded.displayName,
                        createdAt: new Date(),
                        connectedAt: new Date()
                    }
                    resolve(authInfo)
                }
            });
        })
    } else {
        return Promise.resolve(null as any)
    } 
} 

const generateAccessToken = (user: IUser, expiresIn: number) : {accessToken: string, expiredAt: number} => {

    const expiredAt = Date.now() + (expiresIn * 1000)
    //console.log('generateAccessToken', user, expiresIn)
    const claims = {
        id: user.id,
        displayName: user.displayName,
        createdAt: new Date(user.createdAt),
      }
    const accessToken = jwt.sign(claims, SECRET, {
        expiresIn: expiresIn
    })
    return {accessToken, expiredAt}

} 

export {verifyAccessToken, generateAccessToken}