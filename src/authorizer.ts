'use strict'
import * as jwt from 'jsonwebtoken';
const authorizer = (authorization: string) => {
    console.log('authorizer!!!')

    if (authorization) {
        const token = authorization.split('Bearer ')[1];
        const secret = process.env.SECRET + '';
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
               throw new Error('Auth Error from authChecker');
            } else {
                return decoded;                
            }
        });
      } 
} 

export default authorizer;