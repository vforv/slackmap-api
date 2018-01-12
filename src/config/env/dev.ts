import {ConfigOptions, Env} from '../configs';

/**
 * development config
 */
export const dev: ConfigOptions = <ConfigOptions>{
  app: {
    env: Env.DEV,
    host: 'http://localhost:3000'
  }
};
