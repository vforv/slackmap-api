import {Component} from '@nestjs/common';
const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');

@Component()
export class DbMock {}

type Low = Lowdb.Lowdb;
export {Low as Lowdb};

export function dbMockFactory(): Lowdb.Lowdb {
  let adapter;
  const fixtures = require('@slackmap/data-fixtures');
  adapter = new Memory('db.json', {
    defaultValue: fixtures.db
  });
  const db = low(adapter);

  db.defaults(fixtures.db);
  return db;
}

/**
 * add missing d.ts
 */
declare global {
  namespace Lowdb {
    export interface Lowdb {
      unset: (key: any) => Lowdb;
    }
  }
}
