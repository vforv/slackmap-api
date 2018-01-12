import {ConfigOptions, Env} from '../configs';

/**
 * local config
 */
export const local: ConfigOptions = <ConfigOptions>{
  facebook: {
    app_id: 'local-fixture-id-value',
    secret: 'local-fixture-secret-value'
  }
};
