import {Component} from '@slackmap/common';
import {UserEntity} from '@slackmap/data';
import {Query} from './query';

@Component()
export class UserGateway {
  async query(query: Query<UserEntity>): Promise<UserEntity[]> {
    throw Error('implement me');
  }
  async find(query: Partial<UserEntity>): Promise<UserEntity> {
    throw Error('implement me');
  }
  async findAll(props: Partial<UserEntity>): Promise<UserEntity[]> {
    throw Error('implement me');
  }
  async update(id: string, props: Partial<UserEntity>): Promise<UserEntity> {
    throw Error('implement me');
  }
}
