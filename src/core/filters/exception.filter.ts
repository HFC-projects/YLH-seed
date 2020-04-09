import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { config } from '../../config';
import { startCase } from 'lodash';
import {Request, Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = !config.isProd ? exception.message : startCase((HttpStatus[status]).toLowerCase());

    response.status(status)
      .send({
      ...(config.isProd && {error: exception.stack}),
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
