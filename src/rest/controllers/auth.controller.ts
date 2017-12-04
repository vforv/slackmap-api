import { injectable, inject, Container } from 'inversify';
import { Get, Post, Route, Tags, Body, Example } from 'tsoa';
import {
  MeGetResponse,
  ME_GET,
  MeGet,
  AuthLoginByFbRequest,
  AuthLoginByFbResponse,
  AuthLoginByFb,
  AUTH_LOGIN_BY_FB
} from '../../interactors';

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
    const getMe: MeGet = this.ioc.get(ME_GET);
    return getMe.process();
  }

  /**
   *  current application configuration object
   *
   * @returns {Promise<ConfigModel>}
   */
  @Example({
    'accessToken': 'fb-mock-token',
    'signedRequest': 'string'
  })
  @Post('loginByFb')
  public loginByFb(@Body() data: AuthLoginByFbRequest): Promise<AuthLoginByFbResponse> {
    const loginByFb: AuthLoginByFb = this.ioc.get(AUTH_LOGIN_BY_FB);
    return loginByFb.process(data);
  }

}
