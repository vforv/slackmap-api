import {ConfigOptions, Env} from '../configs';
import {resolve} from 'path';

/**
 * development config
 */
export const testrun: ConfigOptions = <ConfigOptions>{
  app: {
    env: Env.TESTRUN,
    host: 'http://localhost:3000'
  },
  facebook: {
    app_id: 'testrun-id-value',
    secret: 'testrun-secret-value'
  }
};
