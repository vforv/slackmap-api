import { injectable, inject, Container } from 'inversify';
import { Get, Post, Route, Tags, Body } from 'tsoa';
import {MeGetResponse, MeGetInteractor, AuthLoginByFbRequest, AuthLoginByFbResponse, AuthLoginByFbInteractor} from '../../interactors';
import * as types from '../../interactors/types';

@Tags('slackmap')
@Route('auth')
@injectable()
export class AuthController {

  constructor(
    @inject(Container) private ioc: Container
  ) {}

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Get('me')
  public meGet(): Promise<MeGetResponse> {
    const getMe: MeGetInteractor = this.ioc.get(types.MeGet);
    return getMe.process();
  }

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Post('loginByFb')
  public loginByFb(@Body() data: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse> {
    const loginByFb: AuthLoginByFbInteractor = this.ioc.get(types.AuthLoginByFb);
    return loginByFb.process(data);
  }

}
