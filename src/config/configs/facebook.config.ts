import {Component, Inject} from '@nestjs/common';

@Component()
export class FacebookConfigOptions {
  app_id: string;
  secret: string;
}

@Component()
export class FacebookConfig {
  app_id = '';
  secret = '';
  scope = ['email'];
  constructor(@Inject(FacebookConfigOptions) data: Partial<FacebookConfigOptions> = {}) {
    Object.assign(this, data);
  }
}
