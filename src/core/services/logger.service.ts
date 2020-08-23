import { Injectable, LoggerService as NestLoggerService, Optional } from '@nestjs/common';
import { formatWithOptions } from 'util';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { config } from '../../config';
import * as path from 'path';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;
  private readonly context: string;

  constructor(@Optional() context: string) {
    this.context = context || '';
    this. logger = this.initWinstonLogger();
  }

  private initWinstonLogger() {

    return createLogger({
      level: config.logger.level,
      format: format.json(),
      defaultMeta: { context :this.context },
      exitOnError: false,
      transports: [
        new transports.DailyRotateFile({
          dirname: path.join(__dirname, './../../../logs/debug/'),
          filename: 'debug.log',
          level: 'debug',
        }),
        new transports.DailyRotateFile({
          dirname: path.join(__dirname, './../../../logs/error/'),
          filename: 'error.log',
          level: 'error',
        }),
        new transports.DailyRotateFile({
          dirname: path.join(__dirname, './../../../logs/info/'),
          filename: 'info.log',
          level: 'info',
        }),
        ...(!config.isProd ? [new transports.Console({
          level: 'info',
          format: format.combine(format.colorize(), format.json()),
        })]: []),
      ],
    });
  }

  static createLogger(context?: string): LoggerService {
    return new LoggerService(context);
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(this.format(message, args));
  }

  error(message: string, error?: Error | string, ...args: any[]) {
    this.logger.error(this.format(message, args), error instanceof Error ? error.stack : error);
  }

  log(message: string, ...args: any[]) {
    this.logger.info(this.format(message, args));
  }

  verbose(message: string, ...args: any[]) {
    this.logger.verbose(this.format(message, args));
  }

  warn(message: string, ...args: any[]): any {
    this.logger.warn(this.format(message, args));
  }

  private format(message: string, args?: string[]) {
    if (!args.length) return message;

    return formatWithOptions({ colors: true, depth: 5 }, message, ...args);
  }
}
