import {FacebookProfileEntity} from '@slackmap/data';

export interface ProfileFixture {
  token: string;
  profile: FacebookProfileEntity;
}
export const profiles: ProfileFixture[] = [
  {
    token: 'valid-profile-token',
    profile: {
      id: '1234567890'
    }
  },
  {
    token: 'invalid-profile-token',
    profile: {}
  },
  {
    token: 'user-profile-token',
    profile: {
      id: '1234567890',
      email: 'test@slackmap.com',
      name: 'Test User',
      first_name: 'Test',
      last_name: 'User'
    }
  }
];
export class FacebookFixture {
  static readonly profiles: ProfileFixture[] = profiles;
  static readonly VALID_PROFILE_TOKEN: string = profiles[0].token;
  static readonly INVALID_PROFILE_TOKEN: string = profiles[1].token;
  static readonly USER_PROFILE_TOKEN: string = profiles[2].token;
  static readonly INVALID_TOKEN: string = 'invalid-token';

  static getByToken(token: string): FacebookProfileEntity {
    const profile = profiles.find(p => p.token === token);
    if (profile) {
      return profile.profile;
    }
    return null;
  }
}
