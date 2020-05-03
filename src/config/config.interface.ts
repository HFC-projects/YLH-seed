import { ValidationPipeOptions, CacheModuleOptions } from '@nestjs/common';
import { ConnectionOptions } from 'mongoose';
export type RecursivePartial<T> = T extends object ? { [K in keyof T]?: RecursivePartial<T[K]> } : T;
export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Stage = 'stage',
}

export interface Config {
  app: {
    name: string;
    description: string;
    version: string;
  };
  port: number;
  host: string;
  environment: Environment;
  isProd: boolean;
  auth?: {secret: string};
  logger:{
    context: string;
    level: string;
  },
  dataAccess: {
    uri: string,
    debug: boolean,
    options: ConnectionOptions,
  };
  cache?: CacheModuleOptions;
  validation: ValidationPipeOptions;
  services: {};
}
