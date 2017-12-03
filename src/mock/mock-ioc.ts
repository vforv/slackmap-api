import {iocFactory} from '../ioc';
import {ContainerModule, Container} from 'inversify';
import * as types from '../interactors';
import {ConfigGetInteractorMock} from './interactors/config-get.mock';
import {appIoc} from '../rest/app-ioc';
import {AuthLoginByFbMock} from './interactors/auth/auth-login-by-fb.mock';

export const mockIoc = new ContainerModule(bind => {
  bind(types.CONFIG_GET)
    .to(ConfigGetInteractorMock)
    .inRequestScope();

  bind(types.ME_GET)
    .to(AuthLoginByFbMock)
    .inRequestScope();

  bind(types.AUTH_LOGIN_BY_FB)
    .to(AuthLoginByFbMock)
    .inRequestScope();
});

export function mockIocFactory(): Container {
  const ioc = iocFactory();

  ioc.load(appIoc, mockIoc);

  return ioc;
}
