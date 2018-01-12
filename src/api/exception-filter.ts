import {AppConfig} from '@slackmap/config';
import {ExceptionFilter, Catch, HttpStatus} from '@nestjs/common';
import {HttpException} from '@nestjs/core';
import {InternalError, NotFoundError} from '@slackmap/data';

@Catch(InternalError, Error)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(err: InternalError, response: any) {
    const data = {
      statusCode: err.statusCode || 500,
      name: err.name || 'InternalError',
      title: err.title || 'Internal Server Error',
      message: err.message,
      data: err.data || {},
      stack: err.stack
    };
    if (false) {
      // TODO add env check and remove stack & message
    }
    response.status(data.statusCode).json(data);
  }
}
