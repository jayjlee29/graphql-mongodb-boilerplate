'use strict'
import * as jwt from 'jsonwebtoken';
import {IAuthInfo, IUser} from './models'

const SECRET: string = process.env.SECRET || ''
const ISSUER: string = 'tenwell.com'
const verifyAccessToken = (authorization: string) :  Promise<IAuthInfo> => {
    
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        const secret = process.env.SECRET + '';
        return new Promise((resolve, reject)=>{

            jwt.verify(token, secret, (err: any, decoded: any) => {
                if (err) {
                    console.error(err);
                    reject(new Error('JWT is not verified'));
                } else {
                    console.log('decoded', decoded)
                    if(!decoded.userId){
                        throw new Error('invalid JWT')
                    }
                    const authInfo : IAuthInfo = {
                        id: decoded.userId,
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

    const accessToken = jwt.sign(user, SECRET, {
        expiresIn: expiresIn
    })
    return {accessToken, expiredAt}

} 

export {verifyAccessToken, generateAccessToken}