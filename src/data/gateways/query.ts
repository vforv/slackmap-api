import {Component} from '@slackmap/common';
import {UserEntity} from '@slackmap/data';

export enum WhereOperator {
  AND,
  OR
}
export interface Query<T> {
  select?: keyof T[];
  where: Partial<T>;
  whereOperator?: WhereOperator;
}
