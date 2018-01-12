import {ConfigOptions, Env} from '../configs';

/**
 * production config
 */
export const prod: ConfigOptions = <ConfigOptions>{
  app: {
    env: Env.PROD,
    host: 'https://slackmap.com'
  }
};
