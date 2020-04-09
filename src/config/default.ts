import { config } from './config.utils';
import { readFileSync } from 'fs';
import { startCase } from 'lodash';
import { Config, Environment } from './config.interface';

const { parse } = config;
const { name, description, version } = JSON.parse(readFileSync('package.json', { encoding: 'utf-8' }));
const appNameStartCase = startCase(name);

const environment: Environment = config.get('NODE_ENV', Environment.Development) as Environment;

export const defaultConfig: Config = {
  app: {
    name: appNameStartCase,
    description,
    version,
  },
  port: config.get<number>('PORT', 3000, parse.integer),
  host: config.get<string>('HOST', '0.0.0.0'),
  environment: environment,
  isProd: environment === Environment.Production,
  auth: {
    secret: config.get('SECRET')
  },
  dataAccess: {
    uri: config.get<string>('MONGO_URI', `mongodb://127.0.0.1:27017/${name}`),
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      config: {
        autoIndex: true,
      },
    },
    debug: config.get<boolean>('MONGO_DEBUG', true, parse.boolean),
  },
  cache: {
    host: config.get('REDIS_HOST', `127.0.0.1`),
    port: config.get<number>('REDIS_PORT', 6379, parse.integer),
    password: config.get('REDIS_PASSWORD'),
    ttl: 5 * 60, // 5 minutes,
  },
  services: {},
  validation: {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    validationError: { target: false },
  },
};
