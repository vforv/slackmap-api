import {Component, Inject} from '@slackmap/common';
import {UserGateway, UserEntity, Query} from '@slackmap/data';
import {DbMock, Lowdb} from '../db/db.mock';
import {DbCollections} from '@slackmap/data-fixtures';

function filter(query: Query<UserEntity>) {
  return function(item: any) {
    let result = false;
    for (const prop in item) {
      if (item.hasOwnProperty(prop) && query.where.hasOwnProperty(prop)) {
        const element = item[prop];
        if (item[prop] === query.where[prop]) {
          result = true;
          return true;
        }
      }
    }
    return result;
  };
}

@Component()
export class UserGatewayMock implements UserGateway {
  constructor(@Inject(DbMock) private db: Lowdb) {}
  async query(query: Query<UserEntity>): Promise<UserEntity[]> {
    return <any>this.db
      .get(DbCollections.USERS)
      .filter(filter(query))
      .value();
  }
  async find(props: Partial<UserEntity>): Promise<UserEntity> {
    return <any>this.db
      .get(DbCollections.USERS)
      .find(props)
      .value();
  }
  async findAll(props: Partial<UserEntity>): Promise<UserEntity[]> {
    return <any>this.db
      .get(DbCollections.USERS)
      .filter(props)
      .value();
  }
  async update(id: string, props: Partial<UserEntity>): Promise<UserEntity> {
    return <any>{};
  }
}
