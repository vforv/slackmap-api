import {Component} from '@slackmap/common';
import {ConfigModel} from '@slackmap/domain';
import {Config} from '@slackmap/config';
import {ConfigGetResponseDto} from '../../dto';

@Component()
export class ConfigGetUseCase {
  constructor(private config: Config) {}
  async process(): Promise<ConfigGetResponseDto> {
    return {
      config: {
        domain: this.config.domain,
        facebook_app_id: this.config.facebook.app_id,
        facebook_scope: this.config.facebook.scope
      }
    };
  }
}
