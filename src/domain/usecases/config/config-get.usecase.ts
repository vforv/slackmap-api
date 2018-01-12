import {Component} from '@slackmap/common';
import {ConfigModel} from '@slackmap/domain';
import {AppConfig, FacebookConfig} from '@slackmap/config';
import {ConfigGetResponseDto} from '../../dto';

@Component()
export class ConfigGetUseCase {
  constructor(private appConfig: AppConfig, private facebookConfig: FacebookConfig) {}
  async process(): Promise<ConfigGetResponseDto> {
    return {
      config: {
        host: this.appConfig.host,
        facebook_app_id: this.facebookConfig.app_id,
        facebook_scope: this.facebookConfig.scope
      }
    };
  }
}
