import {ConfigModel} from '../../models/config.model';

export const CONFIG_GET = Symbol('ConfigGet Interactor');

export interface ConfigGet {
  process(): ConfigModel;
}
