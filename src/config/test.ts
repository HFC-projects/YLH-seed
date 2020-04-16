import { Config, RecursivePartial } from './config.interface';

export const testConfig: RecursivePartial<Config> = {
  cache: {
    store: 'memory',
  },
};
