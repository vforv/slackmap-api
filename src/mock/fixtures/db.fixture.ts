import { UserModel } from '../../models/user.model';
import { FbProfileModel } from '../../models/fb-profile.model';
export enum DbCollections {
  USERS = 'users',
  FB_TOKENS = 'fb_tokents',
}
export const db = {
  [DbCollections.USERS]: <UserModel[]>[
    {
      rid: 'u0test',
      facebook_id: '1234567890',
      email: 'test@slackmap.com',
      name: 'test user name',
      first_name: 'test',
      last_name: 'user'
    }
  ],
  [DbCollections.FB_TOKENS]: <FbTokens[]>[
    {
      token: 'fb-mock-token',
      profile: {
        id: '1234567890',
        email: 'test@slackmap.com',
        name: 'test user name',
        first_name: 'test',
        last_name: 'user'
      }
    }
  ]
};
export interface FbTokens {
  token: string;
  profile: FbProfileModel;
}
