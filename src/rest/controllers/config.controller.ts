import { injectable, inject } from 'inversify';
import { Get, Route, Tags } from 'tsoa';
import { ConfigModel } from '../../models/config.model';
import * as interactors from '../../interactors/index';
import * as types from '../../interactors/types';

@Tags('slackmap')
@Route('config')
@injectable()
export class ConfigController {

  constructor(
    @inject(types.ConfigGet) private configGetInteractor: interactors.ConfigGetInteractor
  ) {}

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Get()
  public get(): ConfigModel {
    return this.configGetInteractor.process();
  }

}
