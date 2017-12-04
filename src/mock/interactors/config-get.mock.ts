import { injectable } from 'inversify';
import {ConfigModel} from '../../models/config.model';

@injectable()
export class ConfigGetInteractorMock {
  async process(): Promise<ConfigModel> {
    return <ConfigModel>{
      domain: 'jest',
      facebook_app_id: 'go',
      facebook_scope: ['jest']
    };
  }
}
