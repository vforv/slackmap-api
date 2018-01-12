import {ConfigOptions, Env} from '../configs';

/**
 * test.slackmap.com configuration
 */
export const test: ConfigOptions = <ConfigOptions>{
  app: {
    env: Env.TEST,
    host: 'https://test.slackmap.com'
  }
};
