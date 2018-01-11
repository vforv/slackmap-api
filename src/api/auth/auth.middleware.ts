import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  if (securityName === 'api_token') {
    let token;
    if (request.query && request.query.api_token) {
      token = request.query.api_token;
    }

    if (token === 'abc123456') {
      return Promise.resolve({
        id: 1,
        name: 'Ironman'
      });
    } else {
      return Promise.reject({error: 'auth error'});
    }
  }

  if (securityName === 'jwt') {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(token, '[secret]', function(err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          // Check if JWT contains all required scopes
          for (const scope of scopes) {
            if (!decoded.scopes.includes(scope)) {
              reject(new Error('JWT does not contain required scope.'));
            }
          }
          resolve(decoded);
        }
      });
    });
  }
}
