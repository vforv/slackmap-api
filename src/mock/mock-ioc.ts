import {iocFactory} from '../ioc';
import {ContainerModule, Container} from 'inversify';
import * as types from '../interactors/types';
import {ConfigGetInteractorMock} from './interactors/config-get.mock';
import {appIoc} from '../rest/app-ioc';
import {AuthLoginByFbMock} from './interactors/auth/auth-login-by-fb.mock';

export const mockIoc = new ContainerModule(bind => {
  bind(types.ConfigGet)
    .to(ConfigGetInteractorMock)
    .inRequestScope();

  bind(types.MeGet)
    .to(AuthLoginByFbMock)
    .inRequestScope();

  bind(types.AuthLoginByFb)
    .to(AuthLoginByFbMock)
    .inRequestScope();
});

export function mockIocFactory(): Container {
  const ioc = iocFactory();

  ioc.load(appIoc, mockIoc);

  return ioc;
}
