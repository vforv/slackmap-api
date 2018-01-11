import {UserEntity} from '@slackmap/data';
import {users} from './users.fixture';

export enum DbCollections {
  USERS = 'users'
}

export const db = {
  [DbCollections.USERS]: users
};
