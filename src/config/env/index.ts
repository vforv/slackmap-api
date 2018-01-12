import {ConfigOptions} from '../configs';

export * from './dev';
export * from './prod';
export * from './test';
export * from './testrun';
// local config is optional, so we have to try/catch it
let local: ConfigOptions = <ConfigOptions>{};
try {
  local = require('./local').local;
} catch (err) {}
export {local};
