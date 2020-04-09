import { defaultConfig } from './default';
import { developmentConfig } from './development';
import { productionConfig } from './production';
import { testConfig } from './test';
import { merge } from 'lodash';
import { Config } from './config.interface';

const environmentConfig = {
  test: testConfig,
  production: productionConfig,
  development: developmentConfig,
};

export const config: Config = merge(defaultConfig, environmentConfig[defaultConfig.environment]);
