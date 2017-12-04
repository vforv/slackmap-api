import {Config} from '../config/config';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

export const DB_MOCK = Symbol('DB Mock');

export function dbMockFactory(config: Config) {
  const adapter = new FileSync(config.getMockDbFile());
  return low(adapter);
}
