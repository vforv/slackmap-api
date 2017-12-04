import {Config} from '../config/config';
import {EnvConfig} from '../config/index';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Memory = require('lowdb/adapters/Memory');

export const DB_MOCK = Symbol('DB Mock');
export type DbMock = Lowdb.Lowdb;

export function dbMockFactory(config: Config): Lowdb.Lowdb {
  let adapter;
  const fixtures = require('./fixtures/db.fixture');
  if (config.env === EnvConfig.TESTRUN) {
    adapter = new Memory('db.json', {
      defaultValue: fixtures.db
    });
  } else {
    adapter = new FileSync(config.getMockDbFile(), {
      defaultValue: fixtures.db
    });
  }
  const db = low(adapter);

  db.defaults(fixtures.db);
  return db;
}
