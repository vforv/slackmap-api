import {Component} from '@slackmap/common';
import {ValidationError, FacebookGateway, UserGateway, WhereOperator} from '@slackmap/data';
import {UserEntity, FacebookProfileEntity} from '@slackmap/data';
import {AuthConnectFacebookRequestDto, AuthConnectFacebookResponseDto} from '../../dto';

@Component()
export class AuthConnectFacebookUseCase {
  constructor(private facebookGateway: FacebookGateway, private userGateway: UserGateway) {}
  async process(request: AuthConnectFacebookRequestDto): Promise<AuthConnectFacebookResponseDto> {
    /**
     * get profile from facebook
     */
    const profile: FacebookProfileEntity = await this.facebookGateway.me(request.accessToken);

    // profile id is required
    if (!profile || !profile.id) {
      throw new ValidationError({title: `We can't get id of your facebook profile :(`, data: {rerequest: true}});
    }

    /**
     * find user in database by facebook_id or email
     */
    const where: Partial<UserEntity> = {facebook_id: profile.id};
    if (profile.email) {
      where.email = profile.email;
    }
    const users: UserEntity[] = await this.userGateway.query({
      where,
      whereOperator: WhereOperator.OR
    });

    return {
      facebookProfile: profile,
      users
    };
  }
}
