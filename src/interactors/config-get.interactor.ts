import {ConfigModel} from '../models/config.model';

export interface ConfigGetInteractor {
  process(): ConfigModel;
}
