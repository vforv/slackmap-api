import { Route, Get, Post, Body, Tags } from 'tsoa';
import { ConfigModel } from '../models/config.model';
import { injectable } from 'inversify';

@Tags('slackmap')
@Route('config')
@injectable()
export class ConfigController {
  private config: ConfigModel = {
    domain: 'https://slackmap.com',
    facebook_app_id: 234234234,
    facebook_scope: ['email', 'basic_info']
  };

  constructor() {}

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Get()
  public async get(): Promise<ConfigModel> {
    return this.config;
  }

  @Post()
  public post(@Body() data: ConfigModel): ConfigModel {
    this.config = data;
    return this.config;
  }
}
