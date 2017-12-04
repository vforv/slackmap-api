import { injectable, inject } from 'inversify';
import { Get, Route, Tags } from 'tsoa';
import { ConfigModel } from '../../models/config.model';
import * as interactors from '../../interactors/index';

@Tags('slackmap')
@Route('config')
@injectable()
export class ConfigController {

  constructor(
    @inject(interactors.CONFIG_GET) private configGet: interactors.ConfigGet
  ) {}

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Get()
  public get(): Promise<ConfigModel> {
    return this.configGet.process();
  }

}
