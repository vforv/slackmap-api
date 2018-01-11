import {Component} from '@slackmap/common';
import {FacebookProfileEntity} from '../entities';

@Component()
export class FacebookGateway {
  async me(accessToken: string): Promise<FacebookProfileEntity> {
    throw new Error('implement me');
  }
}
