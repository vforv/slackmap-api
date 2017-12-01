import {Request, Response, NextFunction} from 'express';
const statuses = require('statuses');

const production = process.env.NODE_ENV === 'prod';

export function errorHandler() {
  return function apiErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let status = err.status || err.statusCode || 500;
    if (status < 400) {
      status = 500;
    }
    res.statusCode = status;

    const body: any = {
      status: status
    };

    // show the stacktrace when not in production
    // TODO: make this an option
    if (!production) {
      body.stack = err.stack;
    }

    // internal server errors
    if (status >= 500) {
      body.message = statuses[status];
      res.json(body);
      return;
    }

    // client errors
    body.message = err.message;

    if (err.code) {
      body.code = err.code;
    }
    if (err.name) {
      body.name = err.name;
    }
    if (err.type) {
      body.type = err.type;
    }

    res.json(body);
  };
}
