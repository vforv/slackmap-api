import {Component} from '@slackmap/common';
import {FacebookGateway} from '@slackmap/data';
import {FacebookFixture} from '@slackmap/data-fixtures';
import {FacebookProfileEntity} from '@slackmap/data';
import {NotFoundError, ValidationError} from '@slackmap/data';

@Component()
export class FacebookGatewayMock extends FacebookGateway {
  public fixture = FacebookFixture;
  public meTokenFixture: string;

  async me(accessToken: string): Promise<FacebookProfileEntity> {
    if (this.meTokenFixture) {
      accessToken = this.meTokenFixture;
    }
    const profile = FacebookFixture.getByToken(accessToken);
    if (!profile) {
      throw new ValidationError({title: 'Facebook token invalid'});
    }
    return profile;
  }
}
