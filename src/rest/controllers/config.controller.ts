import { injectable, inject } from 'inversify';
import { Get, Route, Tags } from 'tsoa';
import { ConfigModel } from '../../models/config.model';
import { interactors, ConfigGetInteractor } from '../../interactors/index';

@Tags('slackmap')
@Route('config')
@injectable()
export class ConfigController {

  constructor(
    @inject(interactors.ConfigGet) private configGetInteractor: ConfigGetInteractor
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
