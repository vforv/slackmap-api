import { injectable } from 'inversify';
import {ConfigModel} from '../models/config.model';

@injectable()
export class ConfigGetInteractor {
  process(): ConfigModel {
    return <ConfigModel>{
      domain: 'jest',
      facebook_app_id: 'go',
      facebook_scope: ['jest']
    };
  }
}
