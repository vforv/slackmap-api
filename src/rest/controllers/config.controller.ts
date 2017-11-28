import { ConfigGetInteractor } from './../../interactors/config-get.interactor';
import { injectable } from 'inversify';
import { Get, Route, Tags } from 'tsoa';
import { ConfigModel } from '../../models/config.model';

@Tags('slackmap')
@Route('config')
@injectable()
export class ConfigController {

  constructor(private configGetInteractor: ConfigGetInteractor) {}

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
