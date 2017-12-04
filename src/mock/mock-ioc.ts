import {iocFactory} from '../ioc';
import {ContainerModule, Container, interfaces} from 'inversify';
import * as types from '../interactors';
import {ConfigGetInteractorMock} from './interactors/config-get.mock';
import {appIoc} from '../rest/app-ioc';
import {AuthLoginByFbMock} from './interactors/auth/auth-login-by-fb.mock';
import {DB_MOCK, dbMockFactory} from './db.mock';
import {Config} from '../config/config';

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

  bind(DB_MOCK)
    .toDynamicValue((context: interfaces.Context) => {
      return dbMockFactory(context.container.get(Config));
    })
    .inSingletonScope();
});

export function mockIocFactory(): Container {
  const ioc = iocFactory();

  ioc.load(appIoc, mockIoc);

  return ioc;
}
