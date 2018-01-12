import {merge} from 'lodash';
import * as path from 'path';
import * as env from './env';
import {Env, ConfigOptions} from 'config';

export function configOptionsFactory(OptionsClass, NODE_ENV: Env, localConfigPath: string | boolean) {
  if (!NODE_ENV) {
    throw new Error('NODE_ENV has to be set');
  }
  NODE_ENV = <any>('' + NODE_ENV).toUpperCase();
  if (!Env[NODE_ENV]) {
    throw new Error(`NODE_ENV value "${NODE_ENV}" is unknown`);
  }
  let local = {};
  if (localConfigPath === true) {
    local = env.local;
  } else if (typeof localConfigPath === 'string') {
    local = require(localConfigPath).local;
  }
  const config: ConfigOptions = <any>merge({}, env[Env[NODE_ENV]], local);
  const name = OptionsClass.name.substr(0, OptionsClass.name.length - 13).toLowerCase();

  return config[name];
}
