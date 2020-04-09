import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { tap } from 'rxjs/operators';
import {Request, Response} from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger: LoggerService = new LoggerService(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const contextType = context.getType();

    return next.handle().pipe(
      tap(
        () => {
          if (contextType === 'http') {
            this.logHttpRequest(context, startTime);
          }
        },
        (error: Error) => {
          if (contextType === 'http') {
            this.logHttpRequest(context, startTime);
          }
        },
      ),
    );
  }

  private logHttpRequest(context: ExecutionContext, startTime: number) {
    if (context.getType() !== 'http') return;
    const reqTime = Date.now() - startTime;
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { url, method } = request;
    const { statusCode } = response;

    this.logger.log(`${method.toUpperCase()} ${url} ${statusCode} [${controllerName}:${handlerName}] ${reqTime}ms`);
  }
}
