import {Component, Inject} from '@nestjs/common';

@Component()
export class SessionConfigOptions {
  // session cookie name default slackmap.sid
  key: string;
  // cookie configuration object
  cookies: {
    signed: boolean; // sign the cookie with the key
    maxage: number; // max live time
  };
}

@Component()
export class SessionConfig implements SessionConfigOptions {
  key = 'slackmap.sid';
  cookies = {
    signed: true,
    maxage: 1000 * 60 * 60 * 24 * 100 // 100 days
  };

  constructor(@Inject(SessionConfigOptions) data: Partial<SessionConfigOptions> = {}) {
    Object.assign(this, data);
  }
}
