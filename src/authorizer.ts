'use strict'
import * as jwt from 'jsonwebtoken';

const SECRET: string = process.env.SECRET || ''
const ISSUER: string = 'tenwell.com'
const verifyAccessToken = async (authorization: string) => {
    
    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        const secret = process.env.SECRET + '';
        return new Promise((resolve, reject)=>{

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.error(err);
                    reject(new Error('Auth Error from authChecker'));
                } else {
                    resolve(decoded)
                }
            });

        })
    } else {
        return Promise.resolve(null)
    } 
} 

const generateAccessToken = (idToken: string, expiredIn: number) => {
    return jwt.sign({
        id: idToken, /**임시 */
        created: Date.now()
    }, SECRET, {
        expiresIn: expiredIn,
        issuer: ISSUER,
        subject: 'accessToken'
    })

} 

export {verifyAccessToken, generateAccessToken}