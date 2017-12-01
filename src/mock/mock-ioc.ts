import {iocFactory} from '../ioc';
import {ContainerModule, Container} from 'inversify';
import {interactors} from '../interactors/index';
import {ConfigGetInteractorMock} from './interactors/config-get.interactor.mock';
import {appIoc} from '../rest/app-ioc';

export const mockIoc = new ContainerModule(bind => {
  bind(interactors.ConfigGet)
    .to(ConfigGetInteractorMock)
    .inRequestScope();
});

export function mockIocFactory(): Container {
  const ioc = iocFactory();

  ioc.load(appIoc, mockIoc);

  return ioc;
}
